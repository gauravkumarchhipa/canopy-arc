import * as THREE from "three";
import { buildCardModel, type ModelBuilder, type ModelParts, type Position } from "../../three/card-model-geometry";
import { studioFinishes } from "../../three/studio-finishes";

const lightGlass = new THREE.Color(studioFinishes.light.glass);
const darkGlass = new THREE.Color(studioFinishes.dark.glass);

function glassPanel(model: ModelParts, parent: THREE.Group, width: number, height: number, position: Position) {
  const panel = new THREE.Group();
  panel.position.set(...position);
  parent.add(panel);
  const face = model.glass.clone();
  face.opacity = 0.64;
  face.depthWrite = false;
  model.box([width, height, 0.12], [0, 0, 0], face, 0.1, panel);
  return panel;
}

function browserHeader({ box, ball, metal, darkMetal }: ModelParts, panel: THREE.Group, width: number, height: number) {
  const y = height / 2 - 0.2;
  for (const x of [0.21, 0.33, 0.45]) {
    ball(0.036, [x - width / 2, y, 0.09], darkMetal, panel);
  }
  box([width * 0.42, 0.047, 0.035], [0.12, y, 0.08], metal, 0.022, panel);
}

function lines({ box, metal }: ModelParts, panel: THREE.Group, x: number, y: number, widths: number[]) {
  widths.forEach((width, index) => {
    box([width, 0.07, 0.05], [x + width / 2, y - index * 0.23, 0.10], metal, 0.03, panel);
  });
}

function chart({ box, metal }: ModelParts, parent: THREE.Group, x: number, y: number, scale: number, heights: number[]) {
  heights.forEach((height, index) => {
    box([0.22 * scale, height * scale, 0.09], [x + index * 0.32 * scale, y + height * scale / 2, 0.14], metal, 0.045, parent);
  });
}

function sahai(model: ModelParts) {
  const { group, tube, add, glass } = model;
  for (const [x, y, z] of [[0.37, 0.25, -0.45], [0.55, -0.08, -0.19], [-0.12, -0.12, 0.29]]) {
    glassPanel(model, group, 2.23, 2.05, [x, y, z]);
  }
  const pearl = glass.clone();
  pearl.color.set("#a9b5b8");
  pearl.opacity = 0.54;
  pearl.depthWrite = false;
  add(new THREE.SphereGeometry(0.58, 40, 28), pearl, [0.27, 0.17, 0.63]);
  const glow = model.glow.clone();
  glow.color.set("#d6e1e1");
  glow.emissive.set("#9aafb4");
  for (let index = 1; index < 18; index++) {
    const latitude = index * Math.PI / 18;
    const radius = 0.6 * Math.sin(latitude);
    const height = 0.6 * Math.cos(latitude);
    const points: Position[] = Array.from({ length: 48 }, (_, step) => {
      const theta = step * Math.PI / 24;
      return [
        radius * Math.cos(theta),
        height + 0.055 * Math.sin(theta * 3 + latitude * 3) * Math.sin(latitude),
        radius * Math.sin(theta),
      ];
    });
    tube(points, 0.011, glow, true).position.set(0.27, 0.17, 0.63);
  }
  group.rotation.set(-0.11, -0.39, 0.15);
}

function pannobaa({ add, metal, glass, glow, group }: ModelParts) {
  const disc = new THREE.LatheGeometry([
    new THREE.Vector2(0, -0.11), new THREE.Vector2(0.9, -0.11),
    new THREE.Vector2(0.985, -0.08), new THREE.Vector2(1, -0.036),
    new THREE.Vector2(1, 0.045), new THREE.Vector2(0.965, 0.09),
    new THREE.Vector2(0.9, 0.11), new THREE.Vector2(0, 0.11),
  ], 64);
  for (const [x, y, z, size, tilt, bank] of [
    [-0.13, -0.85, 0.08, 1.17, 0.16, -0.045],
    [-0.04, -0.27, 0.19, 1.25, 0.18, -0.04],
    [0.38, 0.21, -0.12, 0.86, 0.21, 0.02],
    [0.26, 0.85, -0.04, 0.92, 0.38, 0.13],
  ]) {
    const plate = add(disc, size === 1.25 ? glass : metal, [x, y, z]);
    plate.scale.set(size, 1, size);
    plate.rotation.set(tilt, 0, bank);
  }
  const ring = add(new THREE.TorusGeometry(0.67, 0.019, 8, 72), glow, [0.24, -0.35, 0.17]);
  ring.rotation.x = Math.PI / 2;
  group.rotation.y = -0.18;
}

function zyapaar(model: ModelParts) {
  const { group, box, glass, metal, darkMetal, glow, tube } = model;
  const phone = new THREE.Group();
  group.add(phone);
  box([1.36, 2.55, 0.2], [0, 0, 0], metal, 0.16, phone);
  box([1.28, 2.46, 0.06], [0, 0, 0.112], glass, 0.13, phone);
  box([0.28, 0.039, 0.024], [0, 1.07, 0.149], darkMetal, 0.016, phone);
  lines(model, phone, -0.48, 0.68, [0.93, 0.36]);
  chart(model, phone, -0.46, -0.81, 0.95, [0.35, 0.64, 0.87, 1.1]);
  phone.rotation.set(-0.06, -0.28, -0.24);

  const orbit: Position[] = Array.from({ length: 84 }, (_, index) => {
    const angle = index * Math.PI / 42;
    const x = Math.cos(angle) * 1.38;
    return [x, Math.sin(angle) * 0.44 + x * 0.25 - 0.08, Math.sin(angle) * 0.78];
  });
  tube(orbit, 0.016, glow, true);
}

function guestpostlinks(model: ModelParts) {
  const { group, box, add, metal, glass, glow } = model;
  const dashboard = glassPanel(model, group, 2.64, 2.04, [-0.13, 0.14, -0.14]);
  browserHeader(model, dashboard, 2.64, 2.04);
  lines(model, dashboard, -1.06, 0.41, [0.66, 0.57, 0.43]);
  chart(model, dashboard, -0.95, -0.73, 0.98, [0.18, 0.32, 0.5, 0.74, 1.1, 1.49]);
  const search = glassPanel(model, group, 0.97, 0.99, [0.89, -0.57, 0.48]);
  box([0.86, 0.88, 0.06], [0, 0, 0.05], glass, 0.09, search);
  add(new THREE.TorusGeometry(0.2, 0.035, 12, 40), glow, [-0.047, 0.087, 0.12], search);
  box([0.09, 0.26, 0.07], [0.147, -0.12, 0.12], metal, 0.035, search).rotation.z = 0.72;
  group.rotation.set(-0.11, -0.29, 0.14);
}

function tender(model: ModelParts) {
  const { group, box, metal, glow } = model;
  const back = glassPanel(model, group, 2.32, 1.9, [-0.26, 0.16, -0.36]);
  const front = glassPanel(model, group, 2.28, 1.85, [-0.04, 0.25, 0.08]);
  for (const panel of [back, front]) {
    browserHeader(model, panel, 2.28, 1.85);
    lines(model, panel, -0.85, 0.42, [1.17, 1.47, 1.27, 0.93]);
  }
  const badge = glassPanel(model, group, 0.93, 0.93, [0.78, -0.54, 0.55]);
  box([0.11, 0.28, 0.10], [-0.14, -0.09, 0.12], glow, 0.044, badge).rotation.z = 0.77;
  box([0.11, 0.45, 0.10], [0.075, 0.006, 0.12], glow, 0.044, badge).rotation.z = -0.79;
  box([0.71, 0.025, 0.029], [0, -0.36, 0.09], metal, 0.013, badge);
  group.rotation.set(-0.09, -0.28, 0.115);
}

function gearShape() {
  const shape = new THREE.Shape();
  const radii = [0.48, 0.48, 0.59, 0.59, 0.48, 0.48];
  for (let index = 0; index < 60; index++) {
    const angle = index * Math.PI / 30;
    const radius = radii[index % radii.length];
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.27, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

function orme(model: ModelParts) {
  const { group, extrusion } = model;
  const browser = glassPanel(model, group, 2.54, 1.97, [-0.1, 0.2, -0.25]);
  browserHeader(model, browser, 2.54, 1.97);
  lines(model, browser, -1.03, 0.44, [0.64, 0.54, 0.48, 0.38]);
  const gear = gearShape();
  extrusion(gear, 0.18, 0.04, [0.63, 0.29, 0.26]).rotation.z = 0.22;
  const small = extrusion(gear, 0.18, 0.04, [-0.18, -0.45, 0.58]);
  small.scale.setScalar(0.79);
  small.rotation.z = -0.16;
  group.rotation.set(-0.08, -0.28, 0.1);
}

const builders = new Map<string, ModelBuilder>([
  ["sahai-ai", sahai], ["pannobaa", pannobaa], ["zyapaar", zyapaar],
  ["guestpostlinks", guestpostlinks], ["tender247", tender], ["orme-industries", orme],
]);

export function buildWorkCardModel(id: string) {
  const builder = builders.get(id);
  if (!builder) return null;
  const model = buildCardModel((model) => {
    model.metal.color.set(studioFinishes.light.metal);
    model.metal.roughness = 0.32;
    model.glass.color.copy(lightGlass);
    model.darkMetal.color.set(studioFinishes.light.ribbon);
    model.glow.color.set(studioFinishes.light.rim);
    model.glow.emissive.set(studioFinishes.light.bronze);
    model.glow.emissiveIntensity = 0.52;
    builder(model);
  });
  const glass = new Map<THREE.MeshPhysicalMaterial, { opacity: number; studioTint: boolean }>();
  model.rig.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (material instanceof THREE.MeshPhysicalMaterial && material.transparent) {
        glass.set(material, { opacity: material.opacity, studioTint: material.color.equals(lightGlass) });
      }
    }
  });

  let darkTheme = false;
  return {
    ...model,
    setDarkTheme(dark: boolean) {
      if (darkTheme === dark) return;
      darkTheme = dark;
      for (const [material, { opacity, studioTint }] of glass) {
        material.opacity = dark ? Math.min(0.94, opacity + 0.15) : opacity;
        if (studioTint) material.color.copy(dark ? darkGlass : lightGlass);
        material.emissive.set(dark ? studioFinishes.dark.rim : "#000000");
        material.emissiveIntensity = dark ? 0.18 : 0;
      }
    },
  };
}
