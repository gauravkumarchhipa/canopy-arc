import * as THREE from "three";
import { isGlass, storyCamera, strandCount, strandPoint } from "./story-ribbon";

const profile = [
  [-0.84, -1], [0.84, -1], [1, -0.64], [1, 0.64],
  [0.84, 1], [-0.84, 1], [-1, 0.64], [-1, -0.64],
] as const;
const gauges = [0.030, 0.042, 0.0048, 0.013, 0.010, 0.049];

export function makeStrands(compact: boolean, glass: boolean, {
  poseCount = storyCamera.length,
  gaugeScale = 1,
}: { poseCount?: number; gaugeScale?: number } = {}) {
  const segments = compact ? 28 : 54;
  const lanes = Array.from({ length: strandCount }, (_, strand) => strand)
    .filter((strand) => isGlass(strand) === glass);
  const sides = profile.length;
  const vertices = lanes.length * (segments + 1) * sides;
  const indices: number[] = [];
  const colors = new Float32Array(vertices * 3);
  const uvs = new Float32Array(vertices * 2);
  const color = new THREE.Color();
  const positions: THREE.BufferAttribute[] = [];
  const normals: THREE.BufferAttribute[] = [];
  const geometry = new THREE.BufferGeometry();

  for (let lane = 0; lane < lanes.length; lane++) {
    const strand = lanes[lane];
    color.set(strand === 0 || strand === 23 ? "#928476" : strand % 5 === 0 ? "#777c7c" : "#c0bcb2");
    for (let step = 0; step <= segments; step++) {
      for (let side = 0; side < sides; side++) {
        const a = (lane * (segments + 1) + step) * sides + side;
        const b = a - side + (side + 1) % sides;
        color.toArray(colors, a * 3);
        uvs[a * 2] = step / segments;
        uvs[a * 2 + 1] = side / sides;
        if (step < segments) indices.push(a, b, a + sides, b, b + sides, a + sides);
      }
    }
    const start = lane * (segments + 1) * sides;
    const end = start + segments * sides;
    for (let side = 1; side < sides - 1; side++) {
      indices.push(start, start + side + 1, start + side, end, end + side, end + side + 1);
    }
  }
  geometry.setIndex(indices);
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

  const center = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const previous = new THREE.Vector3();
  const across = new THREE.Vector3();
  const height = new THREE.Vector3();
  const ahead = new THREE.Vector3();
  const behind = new THREE.Vector3();
  const turn = new THREE.Quaternion();

  for (let pose = 0; pose < poseCount; pose++) {
    const points = new Float32Array(vertices * 3);
    let offset = 0;
    for (const strand of lanes) {
      for (let step = 0; step <= segments; step++) {
        const t = step / segments;
        center.set(...strandPoint(pose, strand, t));
        ahead.set(...strandPoint(pose, strand, Math.min(1, t + 0.002)));
        behind.set(...strandPoint(pose, strand, Math.max(0, t - 0.002)));
        tangent.subVectors(ahead, behind).normalize();
        // Parallel transport keeps the wide face from flipping around inflection points.
        if (step === 0) across.set(0, 0.46, 1);
        else across.applyQuaternion(turn.setFromUnitVectors(previous, tangent));
        across.addScaledVector(tangent, -across.dot(tangent)).normalize();
        height.crossVectors(tangent, across);
        previous.copy(tangent);
        const taper = 0.62 + 0.38 * Math.sin(t * Math.PI) ** 0.55;
        const width = gauges[pose] * taper * (glass ? 1.17 : 1);
        const thickness = glass ? 0.012 : 0.007 + width * 0.09;
        for (const [side, top] of profile) {
          points[offset++] = center.x + (across.x * side * width + height.x * top * thickness) * gaugeScale;
          points[offset++] = center.y + (across.y * side * width + height.y * top * thickness) * gaugeScale;
          points[offset++] = center.z + (across.z * side * width + height.z * top * thickness) * gaugeScale;
        }
      }
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
    geometry.deleteAttribute("normal");
    geometry.computeVertexNormals();
    positions.push(geometry.getAttribute("position") as THREE.BufferAttribute);
    normals.push(geometry.getAttribute("normal") as THREE.BufferAttribute);
  }

  geometry.setAttribute("position", positions[0]);
  geometry.setAttribute("normal", normals[0]);
  if (poseCount > 1) {
    geometry.morphAttributes.position = positions.slice(1);
    geometry.morphAttributes.normal = normals.slice(1);
  }
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 4);
  return geometry;
}
