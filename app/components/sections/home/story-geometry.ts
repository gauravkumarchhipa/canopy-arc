import * as THREE from "three";
import { chapters } from "./story-chapters";

const tau = Math.PI * 2;
const sides = 8;
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
const segments = 68;
const sampleCount = segments + 1;
const thicknesses = [0.0045, 0.015, 0.008, 0.006, 0.005, 0.022];

export function strandPoint(chapter: number, strand: number, t: number, target: THREE.Vector3) {
  const ratio = strand / (strandCount - 1);
  const spread = ratio - 0.5;
  const phase = strand * 2.399963;

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
    const lane = strand % 7;
    const layer = Math.floor(strand / 7);
    const x = (t - 0.5) * (4.6 - layer * 0.48);
    const y = (lane - 3) * 0.27 + (layer - 1.5) * 0.21;
    const elbow = THREE.MathUtils.smoothstep(t, 0.26 + lane * 0.025, 0.38 + lane * 0.025);
    return target.set(x, y + elbow * (layer - 1) * 0.26, (layer - 1.5) * 0.54 - elbow * 0.28);
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

  const spark = chapter === 0;
  const longitude = phase + (t - 0.5) * (spark ? 2.1 : 2.45);
  const latitude = (t - 0.5) * (spark ? 2.55 : 2.67);
  const radius = spark ? 0.83 + ratio * 0.36 : 1.15 + 0.15 * Math.sin(phase);
  const fold = spark ? 1 : 1 + 0.12 * Math.cos(longitude * 3 + latitude * 2);
  const x = Math.cos(latitude) * Math.cos(longitude) * radius * fold;
  const z = Math.cos(latitude) * Math.sin(longitude) * radius * fold;
  const y = Math.sin(latitude) * radius * fold;
  const compression = chapter === 4 ? 0.77 : 1;
  return target.set(
    x * (spark ? 1 : 1.65) * compression,
    y * (spark ? 1 : 0.76) * compression - (chapter === 4 ? 0.1 : 0),
    z * compression,
  );
}

export function makeStrands() {
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

  for (let chapter = 0; chapter < chapters.length; chapter++) {
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

export function makeNetwork() {
  const sphere = new THREE.IcosahedronGeometry(1, 1);
  const positions = sphere.getAttribute("position");
  const vertex = new THREE.Vector3();
  const proportions = new THREE.Vector3(1.94, 1.04, 1.2);
  const vertices = new Map<string, THREE.Vector3>();

  for (let index = 0; index < positions.count; index++) {
    vertex.fromBufferAttribute(positions, index);
    const key = [vertex.x, vertex.y, vertex.z].map((value) => Math.round(value * 1000)).join(",");
    if (!vertices.has(key)) {
      const contour = 1 + Math.sin(vertex.x * 9 + vertex.z * 7) * 0.07;
      vertices.set(key, vertex.clone().multiplyScalar(contour).multiply(proportions));
    }
    const point = vertices.get(key)!;
    positions.setXYZ(index, point.x, point.y, point.z);
  }

  const lines = new THREE.WireframeGeometry(sphere);
  const lights = new THREE.BufferGeometry().setFromPoints([...vertices.values()]);
  const accents = new THREE.BufferGeometry().setFromPoints([...vertices.values()].filter((_, index) => index % 4 === 1));
  sphere.dispose();
  return { lines, lights, accents };
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

export function makeBrainNetwork() {
  const { points, edges } = makeBrainMesh();
  return {
    lines: new THREE.BufferGeometry().setFromPoints(edges.flatMap(([a, b]) => [points[a], points[b]])),
    lights: new THREE.BufferGeometry().setFromPoints(points),
    accents: new THREE.BufferGeometry().setFromPoints(points.filter((_, index) => index % 4 === 1)),
  };
}
