import * as THREE from "three";
import { chapters } from "./story-chapters";

const tau = Math.PI * 2;
export const strandCount = 26;
export const stageFloorY = -1.42;
export const storyCamera = {
  azimuths: [0.06, 0.18, -0.25, 0.18, -0.12, 0.57],
  distances: [6.85, 8.65, 7.65, 6.8, 7.4, 8.8],
  elevations: [0.18, 0.27, 0.42, 0.22, 0.27, 0.56],
};
export const storyPanels = [
  { x: -1.47, y: -0.39, z: -0.45, size: 0.76 },
  { x: 1.57, y: 0.12, z: -0.62, size: 0.79 },
  { x: 0.70, y: 0.22, z: 0.02, size: 0.99 },
  { x: -0.31, y: -0.04, z: 0.58, size: 1.18 },
];
export const panelTilt = new THREE.Euler(-0.12, 0.14, 0.075);
const thicknesses = [0.0045, 0.015, 0.008, 0.0032, 0.0044, 0.022, 0.009, 0.012];
const brain = makeBrainMesh();
const brainPaths = brain.points.map((_, index) => brain.edges.flatMap(([a, b]) =>
  a === index ? [b] : b === index ? [a] : []));
const shieldBorder = makeShieldShape().getSpacedPoints(96);
const intermediatePoint = new THREE.Vector3();

export function makeShieldShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.61);
  shape.quadraticCurveTo(0.22, 0.43, 0.5, 0.4);
  shape.lineTo(0.46, -0.05);
  shape.quadraticCurveTo(0.38, -0.49, 0, -0.66);
  shape.quadraticCurveTo(-0.38, -0.49, -0.46, -0.05);
  shape.lineTo(-0.5, 0.4);
  shape.quadraticCurveTo(-0.22, 0.43, 0, 0.61);
  return shape;
}

function panelPoint(index: number, x: number, y: number, z: number, target: THREE.Vector3) {
  const panel = storyPanels[index];
  const angle = (index - 1.5) * 0.09;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return target.set(
    panel.x + (x * c + z * s) * panel.size,
    panel.y + y * panel.size,
    panel.z + (z * c - x * s) * panel.size,
  ).applyEuler(panelTilt);
}

function protectedPoint(point: THREE.Vector3, target: THREE.Vector3) {
  return target.set(point.x * 0.61, point.y * 0.70 - 0.08, point.z * 0.86);
}

export function strandPoint(chapter: number, strand: number, t: number, target: THREE.Vector3) {
  const ratio = strand / (strandCount - 1);
  const spread = ratio - 0.5;
  const phase = strand * 2.399963;

  if (chapter >= chapters.length) {
    const unspooling = chapter === chapters.length;
    const other = strandPoint(unspooling ? 1 : 5, strand, t, intermediatePoint);
    strandPoint(unspooling ? 0 : 4, strand, t, target).lerp(other, 0.49);
    const arc = Math.sin(t * Math.PI);
    return target.set(
      target.x + Math.cos(t * tau + phase) * arc * (unspooling ? 0.32 : 0.17),
      target.y + arc * (0.3 + spread * 0.36),
      target.z + Math.sin(t * tau + phase) * arc * (unspooling ? 0.54 : 0.41),
    );
  }

  if (chapter === 1) {
    const rise = Math.sin(Math.PI * t) ** 0.82;
    const smallArch = Math.exp(-(((t - 0.23) / 0.16) ** 2));
    const tallArch = Math.exp(-(((t - 0.72) / 0.17) ** 2));
    return target.set(
      (t - 0.5) * 5.5 + spread * 0.47,
      stageFloorY + (1.51 * smallArch + 2.88 * tallArch) * rise
        + spread * Math.cos(t * tau) * rise * 0.88,
      spread * 2.95 + Math.sin(t * tau - 0.7) * 0.57,
    );
  }

  if (chapter === 2) {
    if (strand < 16) {
      const index = strand % storyPanels.length;
      const lane = Math.floor(strand / storyPanels.length);
      const angle = (t + lane * 0.25) * tau;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      // These strands become the four bezels. Slightly offset lanes catch separate highlights.
      const divisor = Math.max(Math.abs(x), Math.abs(y)) + 0.045;
      return panelPoint(index, 0.96 * x / divisor, 0.625 * y / divisor, -0.08 + lane * 0.06, target);
    }
    const lane = strand % 7;
    const layer = Math.floor(strand / 7);
    const x = (t - 0.5) * (4.6 - layer * 0.48);
    const y = (lane - 3) * 0.27 + (layer - 1.5) * 0.21;
    const elbow = THREE.MathUtils.smoothstep(t, 0.26 + lane * 0.025, 0.38 + lane * 0.025);
    return target.set(x, y + elbow * (layer - 1) * 0.26, (layer - 1.5) * 0.54 - elbow * 0.28);
  }

  if (chapter === 3 || chapter === 4) {
    if (chapter === 4 && strand >= 23) {
      const step = t * (shieldBorder.length - 1);
      const a = shieldBorder[Math.floor(step)];
      const b = shieldBorder[Math.min(Math.floor(step) + 1, shieldBorder.length - 1)];
      const x = THREE.MathUtils.lerp(a.x, b.x, step % 1) * 1.1;
      const y = THREE.MathUtils.lerp(a.y, b.y, step % 1) * 1.1;
      return target.set(0.83 + x * Math.cos(-0.34), -0.23 + y,
        1.35 - x * Math.sin(-0.34) + (strand - 24) * 0.012);
    }
    if (chapter === 4 && strand >= 20) {
      const angle = (t - 0.5) * Math.PI * 1.72;
      const tilt = (strand - 22.5) * 0.39;
      const radius = 1.39 + (strand % 2) * 0.013;
      return target.set(Math.sin(angle) * radius, Math.cos(angle) * radius * Math.cos(tilt),
        Math.cos(angle) * radius * Math.sin(tilt));
    }
    const origin = (strand * 7) % brain.points.length;
    const first = brainPaths[origin][strand % brainPaths[origin].length];
    const next = brainPaths[first].find((node) => node !== origin) ?? origin;
    const start = t < 0.5 ? origin : first;
    const end = t < 0.5 ? first : next;
    target.copy(brain.points[start]).lerp(brain.points[end], t < 0.5 ? t * 2 : t * 2 - 1);
    return chapter === 4 ? protectedPoint(target, target) : target;
  }

  if (chapter === 5) {
    const angle = t * Math.PI;
    const arch = 1.58 + 0.24 * Math.cos(spread * Math.PI);
    return target.set(
      -Math.cos(angle) * (2.08 + spread * 0.46) + spread * 0.43,
      stageFloorY + Math.pow(Math.sin(angle), 0.86) * arch * 1.59,
      spread * 2.9 + Math.sin(angle * 2) * spread * 0.45,
    );
  }

  const longitude = phase + (t - 0.5) * 2.1;
  const latitude = (t - 0.5) * 2.55;
  const radius = 0.83 + ratio * 0.36;
  return target.set(
    Math.cos(latitude) * Math.cos(longitude) * radius,
    Math.sin(latitude) * radius,
    Math.cos(latitude) * Math.sin(longitude) * radius,
  );
}

export function makeStrands(compact: boolean) {
  const sides = compact ? 5 : 8;
  const segments = compact ? 38 : 68;
  const sampleCount = segments + 1;
  const positions: THREE.BufferAttribute[] = [];
  const normals: THREE.BufferAttribute[] = [];
  const indices: number[] = [];
  const colors: number[] = [];
  const silver = new THREE.Color("#c7c4bb");
  const gold = new THREE.Color("#dba865");
  const ceramic = new THREE.Color("#84918e");
  const point = new THREE.Vector3();
  const ahead = new THREE.Vector3();
  const behind = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const binormal = new THREE.Vector3();
  const radial = new THREE.Vector3();
  const axis = new THREE.Vector3(0, 0, 1);
  const backup = new THREE.Vector3(0, 1, 0);
  const color = new THREE.Color();

  for (let chapter = 0; chapter < thicknesses.length; chapter++) {
    const vertices: number[] = [];
    const directions: number[] = [];
    for (let strand = 0; strand < strandCount; strand++) {
      const base = strand * sampleCount * sides;
      const baseColor = strand % 8 === 0 ? gold : strand % 4 === 0 ? ceramic : silver;
      for (let step = 0; step <= segments; step++) {
        const t = step / segments;
        const radius = thicknesses[chapter] * (0.8 + 0.2 * Math.sin(t * Math.PI));
        strandPoint(chapter, strand, t, point);
        strandPoint(chapter, strand, Math.min(1, t + 0.001), ahead);
        strandPoint(chapter, strand, Math.max(0, t - 0.001), behind);
        tangent.subVectors(ahead, behind).normalize();
        normal.crossVectors(tangent, Math.abs(tangent.z) > 0.96 ? backup : axis).normalize();
        binormal.crossVectors(tangent, normal).normalize();
        for (let side = 0; side < sides; side++) {
          const angle = side / sides * tau;
          radial.copy(normal).multiplyScalar(Math.cos(angle)).addScaledVector(binormal, Math.sin(angle));
          directions.push(radial.x, radial.y, radial.z);
          radial.multiplyScalar(radius).add(point);
          vertices.push(radial.x, radial.y, radial.z);
          if (chapter !== 0) continue;
          color.copy(baseColor).multiplyScalar(0.82 + 0.18 * Math.sin(t * Math.PI));
          colors.push(color.r, color.g, color.b);
          if (step === segments) continue;
          const a = base + step * sides + side;
          const b = base + step * sides + (side + 1) % sides;
          indices.push(a, b, a + sides, b, b + sides, a + sides);
        }
      }
    }
    positions.push(new THREE.Float32BufferAttribute(vertices, 3));
    normals.push(new THREE.Float32BufferAttribute(directions, 3));
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", positions[0]);
  geometry.setAttribute("normal", normals[0]);
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.morphAttributes.position = positions.slice(1);
  geometry.morphAttributes.normal = normals.slice(1);
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 4);
  return geometry;
}

function makeSparkGraph() {
  const sphere = new THREE.IcosahedronGeometry(1, 1);
  const positions = sphere.getAttribute("position");
  const vertex = new THREE.Vector3();
  const indices = new Map<string, number>();
  const points: THREE.Vector3[] = [];
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  const indexAt = (index: number) => {
    vertex.fromBufferAttribute(positions, index);
    const key = [vertex.x, vertex.y, vertex.z].map((value) => Math.round(value * 1000)).join(",");
    const existing = indices.get(key);
    if (existing !== undefined) return existing;
    const next = points.length;
    const contour = 1 + Math.sin(vertex.x * 9 + vertex.z * 7) * 0.07;
    points.push(vertex.clone().multiplyScalar(contour).multiply(new THREE.Vector3(1.09, 1.09, 1.03)));
    indices.set(key, next);
    return next;
  };

  for (let index = 0; index < positions.count; index += 3) {
    const triangle = [indexAt(index), indexAt(index + 1), indexAt(index + 2)];
    for (let corner = 0; corner < 3; corner++) {
      const a = triangle[corner];
      const b = triangle[(corner + 1) % 3];
      const key = `${Math.min(a, b)}:${Math.max(a, b)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([a, b]);
    }
  }
  sphere.dispose();
  return { points, edges };
}

export function makeBrainMesh() {
  // Side profile from the forehead around the crown to the brainstem and temporal lobe.
  const profile = [
    [-2.02, -0.16], [-1.91, 0.28], [-1.68, 0.62], [-1.32, 0.91],
    [-0.88, 1.08], [-0.36, 1.16], [0.17, 1.16], [0.65, 1.08],
    [1.08, 0.90], [1.46, 0.68], [1.76, 0.38], [1.94, 0.03],
    [1.96, -0.31], [1.79, -0.57], [1.50, -0.76], [1.13, -0.83],
    [0.77, -0.77], [0.63, -1.16], [0.32, -1.23], [0.19, -0.88],
    [-0.15, -0.70], [-0.59, -0.54], [-1.09, -0.67], [-1.62, -0.59],
  ];
  const rim = profile.map(([x, y], index) => new THREE.Vector3(x, y, Math.sin(index * 2.4) * 0.09));
  const points = [...rim];
  const edges: [number, number][] = rim.map((_, index) => [index, (index + 1) % rim.length]);

  // Two inset surfaces give the silhouette volume and keep the mesh connected during an orbit.
  for (const side of [1, -1]) {
    const start = points.length;
    const count = rim.length / 2;
    for (let index = 0; index < count; index++) {
      const outer = index * 2;
      const next = (index + 1) % count;
      const point = rim[outer].clone().lerp(rim[outer + 1], 0.45);
      const inset = 0.68 + Math.sin(index * 2.4 + side) * 0.12;
      point.x *= inset;
      point.y = point.y * inset + 0.06;
      point.z = side * (0.65 + Math.cos(index * 2.1 + side) * 0.12);
      points.push(point);
      edges.push([start + index, start + next], [start + index, outer],
        [start + index, outer + 1], [start + index, (outer + 2) % rim.length]);
    }

    const center = points.length;
    points.push(new THREE.Vector3(-0.51, 0.06, side * 0.91), new THREE.Vector3(0.59, 0.11, side * 0.88));
    edges.push([center, center + 1]);
    for (let index = 0; index < count; index++) {
      const half = index >= 4 && index <= 8 ? 1 : 0;
      edges.push([start + index, center + half]);
    }
    edges.push([start + 3, center + 1], [start + 8, center]);
  }

  return { points, edges };
}

export function makeStoryNetwork() {
  const spark = makeSparkGraph();
  const sphere = brain.points.map((point) => point.clone().multiply(new THREE.Vector3(0.58, 1, 1.32)).normalize());
  const unassigned = new Set(sphere.keys());
  const directions = sphere.map((point) => point.clone());
  const mapping = spark.points.map((point) => {
    let best = -1;
    let distance = Infinity;
    for (const index of unassigned) {
      const next = point.distanceToSquared(directions[index]);
      if (next < distance) {
        best = index;
        distance = next;
      }
    }
    unassigned.delete(best);
    sphere[best].copy(point);
    return best;
  });

  const poses = [
    sphere,
    brain.points.map((_, index) => strandPoint(1, index % strandCount, 0.14 + (index % 9) * 0.09, new THREE.Vector3())),
    brain.points.map((_, index) => {
      const panel = index % storyPanels.length;
      const x = (index % 7 - 3) * 0.255;
      const y = (Math.floor(index / 5) % 5 - 2) * 0.22;
      return panelPoint(panel, x, y, 0.06, new THREE.Vector3());
    }),
    brain.points,
    brain.points.map((point) => protectedPoint(point, new THREE.Vector3())),
    brain.points.map((_, index) => strandPoint(5, index % strandCount, 0.15 + (index % 8) * 0.1, new THREE.Vector3())),
  ];
  const edges = [
    ...spark.edges.map(([a, b]) => ({ a: mapping[a], b: mapping[b], spark: true })),
    ...brain.edges.map(([a, b]) => ({ a, b, spark: false })),
  ];
  return { poses, edges };
}
