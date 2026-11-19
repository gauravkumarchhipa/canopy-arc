import * as THREE from "three";
import { buildCardModel, type ModelBuilder, type ModelParts as Model, type Position } from "../../three/card-model-geometry";

function browsers({ group, box, ball, metal, glass, glow }: Model) {
  for (const [x, y, z] of [[0.57, -0.43, -0.43], [0.28, -0.2, -0.05], [-0.12, 0.14, 0.38]]) {
    const panel = new THREE.Group();
    panel.position.set(x, y, z);
    group.add(panel);
    box([2.05, 1.38, 0.105], [0, 0, 0], metal, 0.1, panel);
    box([1.97, 1.29, 0.035], [0, 0, 0.058], glass, 0.085, panel);
    box([1.93, 0.012, 0.015], [0, 0.39, 0.081], metal, 0.008, panel);
    for (const offset of [0, 0.15, 0.3]) ball(0.038, [-0.83 + offset, 0.51, 0.085], glow, panel);
  }
  group.rotation.set(0.09, -0.31, 0.13);
}

function phones({ group, box, metal, glass, darkMetal }: Model) {
  box([1.01, 1.95, 0.13], [-0.53, -0.12, -0.3], metal, 0.13).rotation.z = -0.04;
  const phone = new THREE.Group();
  phone.position.set(0.22, 0.02, 0.25);
  phone.rotation.set(-0.2, -0.32, 0.19);
  group.add(phone);
  box([1.1, 2.13, 0.18], [0, 0, 0], metal, 0.16, phone);
  box([1.015, 2.04, 0.055], [0, 0, 0.089], glass, 0.14, phone);
  box([0.23, 0.045, 0.016], [0, 0.9, 0.12], darkMetal, 0.02, phone);
  box([0.03, 0.27, 0.05], [0.55, 0.42, 0], metal, 0.014, phone);
}

function geodesic({ group, wire, glow, geometries, add }: Model) {
  // Occlude the rear wires through the core while leaving the lattice itself transparent.
  add(new THREE.SphereGeometry(1.04, 24, 16), new THREE.MeshBasicMaterial({ colorWrite: false })).renderOrder = -1;
  const surface = new THREE.IcosahedronGeometry(1.13, 1);
  const edges = new THREE.EdgesGeometry(surface, 1);
  geometries.add(edges);
  group.add(new THREE.LineSegments(edges, wire));
  const vertices = surface.getAttribute("position");
  const points = new Map<string, THREE.Vector3>();
  for (let index = 0; index < vertices.count; index++) {
    const point = new THREE.Vector3().fromBufferAttribute(vertices, index);
    points.set(point.toArray().map((axis) => Math.round(axis * 1000)).join(","), point);
  }
  surface.dispose();
  const geometry = new THREE.SphereGeometry(0.049, 12, 8);
  geometries.add(geometry);
  const nodes = new THREE.InstancedMesh(geometry, glow, points.size);
  const transform = new THREE.Matrix4();
  [...points.values()].forEach((point, index) => {
    nodes.setMatrixAt(index, transform.makeTranslation(point.x, point.y, point.z));
  });
  group.add(nodes);
  group.rotation.set(0.18, -0.32, 0.14);
}

function shield({ group, extrusion, glass }: Model) {
  const outline = new THREE.Shape();
  outline.moveTo(0, 1.14);
  outline.bezierCurveTo(0.33, 0.94, 0.65, 0.86, 0.93, 0.83);
  outline.lineTo(0.87, -0.12);
  outline.bezierCurveTo(0.82, -0.62, 0.38, -0.99, 0, -1.15);
  outline.bezierCurveTo(-0.38, -0.99, -0.82, -0.62, -0.87, -0.12);
  outline.lineTo(-0.93, 0.83);
  outline.bezierCurveTo(-0.65, 0.86, -0.33, 0.94, 0, 1.14);
  extrusion(outline, 0.17, 0.08, [0, 0, 0]);
  extrusion(outline, 0.04, 0.075, [0, 0, 0.15], glass).scale.set(0.87, 0.87, 1);
  group.rotation.set(0.02, -0.21, -0.035);
}

function clouds({ add, group, metal }: Model) {
  const pearl = metal.clone();
  pearl.color.set("#e5d9c6");
  pearl.metalness = 0.43;
  pearl.roughness = 0.34;
  const puff = new THREE.SphereGeometry(1, 28, 20);
  for (const [x, y, z, scale] of [[0.21, 0.34, -0.26, 1], [-0.45, -0.23, 0.29, 0.72], [0.56, -0.49, 0.59, 0.48]]) {
    const cloud = new THREE.Group();
    cloud.position.set(x, y, z);
    cloud.scale.setScalar(scale);
    group.add(cloud);
    add(puff, pearl, [0.02, -0.15, 0], cloud).scale.set(0.97, 0.32, 0.28);
    add(puff, pearl, [-0.63, -0.06, 0.025], cloud).scale.set(0.38, 0.41, 0.36);
    add(puff, pearl, [-0.19, 0.2, 0], cloud).scale.set(0.58, 0.62, 0.38);
    add(puff, pearl, [0.43, 0.05, -0.02], cloud).scale.set(0.49, 0.49, 0.38);
    add(puff, pearl, [0.73, -0.16, 0.016], cloud).scale.set(0.3, 0.31, 0.32);
  }
}

function design({ add, glass, metal }: Model) {
  const disc = new THREE.LatheGeometry([
    new THREE.Vector2(0, -0.12), new THREE.Vector2(0.83, -0.12),
    new THREE.Vector2(0.92, -0.1), new THREE.Vector2(0.97, -0.049),
    new THREE.Vector2(0.97, 0.049), new THREE.Vector2(0.92, 0.1),
    new THREE.Vector2(0.83, 0.12), new THREE.Vector2(0, 0.12),
  ], 64);
  add(disc, glass, [0, -0.52, 0]).rotation.x = 0.12;
  add(disc, metal, [0, 0.43, 0]).rotation.set(0.43, 0.24, 0.31);
}

function dataBars({ box, group }: Model) {
  [0.66, 1.0, 1.38, 1.88].forEach((height, index) => {
    box([0.41, height, 0.51], [index * 0.46 - 0.69, height / 2 - 0.96, 0]);
  });
  group.rotation.set(0.08, -0.36, 0.035);
}

function globe({ ball, tube, group }: Model) {
  ball(0.83, [0, 0, 0]);
  for (const tilt of [-0.61, 0.72]) {
    const path: Position[] = Array.from({ length: 48 }, (_, index) => {
      const angle = index * Math.PI / 24;
      const x = Math.cos(angle) * 1.31;
      const y = Math.sin(angle) * 0.52;
      return [x * Math.cos(tilt) - y * Math.sin(tilt), x * Math.sin(tilt) + y * Math.cos(tilt), Math.sin(angle) * 0.94];
    });
    tube(path, 0.019, undefined, true);
    ball(0.075, path[5]);
    ball(0.065, path[29]);
  }
  group.rotation.set(0.15, 0.19, -0.12);
}

function marketing({ extrusion, group }: Model) {
  const arrow = new THREE.Shape();
  arrow.moveTo(-1.27, -0.89);
  arrow.bezierCurveTo(-0.46, -0.75, 0.09, -0.09, 0.44, 0.5);
  arrow.lineTo(0.16, 0.63);
  arrow.lineTo(0.91, 1.12);
  arrow.lineTo(1.04, 0.19);
  arrow.lineTo(0.75, 0.36);
  arrow.bezierCurveTo(0.28, -0.46, -0.44, -1.0, -1.27, -0.89);
  extrusion(arrow, 0.26, 0.055, [0, 0, 0]);
  group.rotation.set(-0.11, -0.26, 0.04);
}

function shopping({ extrusion, tube, group }: Model) {
  const bag = new THREE.Shape();
  bag.moveTo(-0.95, -0.94);
  bag.lineTo(0.95, -0.94);
  bag.lineTo(0.67, 0.64);
  bag.lineTo(-0.67, 0.64);
  bag.closePath();
  extrusion(bag, 0.55, 0.055, [0, 0, 0]);
  for (const depth of [-0.26, 0.32]) {
    tube([[-0.37, 0.51, depth], [-0.32, 1.04, depth], [0, 1.23, depth], [0.32, 1.04, depth], [0.37, 0.51, depth]], 0.047);
  }
  group.rotation.set(0.09, -0.31, -0.03);
}

function headset({ box, tube, add, group, glass, metal }: Model) {
  box([2.0, 1.1, 0.68], [0, -0.17, 0], metal, 0.32);
  box([1.89, 0.98, 0.11], [0, -0.17, 0.37], glass, 0.3);
  tube([[-0.85, -0.01, -0.17], [-0.58, 0.79, -0.29], [0, 0.96, -0.31], [0.58, 0.79, -0.29], [0.85, -0.01, -0.17]], 0.095);
  add(new THREE.CylinderGeometry(0.23, 0.23, 0.11, 32), metal, [1, -0.16, -0.02]).rotation.z = Math.PI / 2;
  group.rotation.set(0.09, -0.43, -0.075);
}

function servers({ box, ball, group, metal, darkMetal, glow }: Model) {
  for (const y of [-0.59, 0, 0.59]) {
    box([1.94, 0.54, 1.03], [0, y, 0], metal, 0.11);
    for (const x of [-0.69, -0.51, -0.33]) ball(0.042, [x, y, 0.524], glow);
    for (const offset of [-0.06, 0.06]) {
      box([0.47, 0.045, 0.025], [0.48, y + offset, 0.523], darkMetal, 0.023);
    }
  }
  group.rotation.set(0.19, -0.49, 0.07);
}

function checks({ box, add, group, glass, metal }: Model) {
  for (const [x, y, z] of [[0.47, 0.38, -0.29], [-0.35, -0.32, 0.37]]) {
    box([1.38, 1.3, 0.19], [x, y, z], metal, 0.19);
    box([1.29, 1.22, 0.06], [x, y, z + 0.105], glass, 0.16);
    const path = new THREE.CurvePath<THREE.Vector3>();
    const start = new THREE.Vector3(x - 0.34, y + 0.02, z + 0.16);
    const corner = new THREE.Vector3(x - 0.12, y - 0.22, z + 0.16);
    const end = new THREE.Vector3(x + 0.35, y + 0.27, z + 0.16);
    path.add(new THREE.LineCurve3(start, corner));
    path.add(new THREE.LineCurve3(corner, end));
    add(new THREE.TubeGeometry(path, 16, 0.061, 8, false), metal);
  }
  group.rotation.set(0.06, -0.23, 0.09);
}

function video({ box, extrusion, group, metal, glass, darkMetal }: Model) {
  box([2.15, 1.54, 0.19], [0, 0, 0], metal, 0.2);
  box([2.06, 1.45, 0.06], [0, 0, 0.106], glass, 0.17);
  const play = new THREE.Shape();
  play.moveTo(-0.23, 0.34);
  play.lineTo(0.36, 0);
  play.lineTo(-0.23, -0.34);
  play.closePath();
  extrusion(play, 0.05, 0.045, [0, 0, 0.16], darkMetal);
  group.rotation.set(0.03, -0.24, 0.09);
}

function towers({ box, group, metal, glass }: Model) {
  for (const [x, height, z] of [[-0.62, 1.03, 0.23], [0, 2.06, -0.21], [0.64, 1.5, 0.13]]) {
    box([0.54, height, 0.5], [x, height / 2 - 1, z], glass, 0.055);
    box([0.56, 0.14, 0.52], [x, height - 1, z], metal, 0.05);
    for (const offset of [-0.18, -0.06, 0.06, 0.18]) {
      box([0.018, height - 0.14, 0.028], [x + offset, height / 2 - 1.04, z + 0.255], metal, 0.009);
    }
  }
  group.rotation.set(0.08, -0.27, 0);
}

const builders = new Map<string, ModelBuilder>([
  ["web-development", browsers], ["app-development", phones], ["ai-ml", geodesic],
  ["cybersecurity", shield], ["iot", globe], ["data-engineering", dataBars],
  ["cloud-devops", clouds], ["ui-ux-design", design], ["digital-marketing", marketing],
  ["ecommerce-saas", shopping], ["ar-vr", headset], ["backend-api", servers],
  ["qa-automation", checks], ["video-content", video], ["enterprise-solutions", towers],
]);

export function buildServiceCardModel(id: string) {
  const builder = builders.get(id);
  return builder ? buildCardModel(builder) : null;
}
