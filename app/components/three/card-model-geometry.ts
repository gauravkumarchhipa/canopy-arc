import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type Position = [number, number, number];
export type ModelParts = ReturnType<typeof createModel>;
export type ModelBuilder = (model: ModelParts) => void;
export type CardModel = ReturnType<typeof buildCardModel>;

function createModel() {
  const group = new THREE.Group();
  const metal = new THREE.MeshPhysicalMaterial({
    color: "#dfd7c8", metalness: 0.85, roughness: 0.25, clearcoat: 0.75,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: "#e5dccd", metalness: 0.47, roughness: 0.24, clearcoat: 1,
    transparent: true, opacity: 0.82,
  });
  const darkMetal = new THREE.MeshStandardMaterial({
    color: "#8d8375", metalness: 0.62, roughness: 0.31,
  });
  const glow = new THREE.MeshStandardMaterial({
    color: "#fff0cb", emissive: "#ffce86", emissiveIntensity: 0.8, roughness: 0.32,
  });
  const wire = new THREE.LineBasicMaterial({ color: "#a9977c" });
  const materials = new Set<THREE.Material>([metal, glass, darkMetal, glow, wire]);
  const geometries = new Set<THREE.BufferGeometry>();

  function add(geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], position: Position = [0, 0, 0], parent = group) {
    geometries.add(geometry);
    if (Array.isArray(material)) material.forEach((item) => materials.add(item));
    else materials.add(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    parent.add(mesh);
    return mesh;
  }

  function box(size: Position, position: Position, material: THREE.Material = metal, radius = 0.085, parent = group) {
    return add(new RoundedBoxGeometry(...size, 3, radius), material, position, parent);
  }

  function ball(radius: number, position: Position, material: THREE.Material = metal, parent = group) {
    return add(new THREE.SphereGeometry(radius, 20, 14), material, position, parent);
  }

  function tube(points: Position[], radius: number, material: THREE.Material = metal, closed = false) {
    const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)), closed);
    return add(new THREE.TubeGeometry(curve, 48, radius, 8, closed), material);
  }

  function extrusion(shape: THREE.Shape, depth: number, bevel: number, position: Position, face: THREE.Material = metal) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth, bevelEnabled: true, bevelSegments: 5, bevelSize: bevel, bevelThickness: bevel,
      curveSegments: 24,
    });
    geometry.translate(0, 0, -depth / 2);
    return add(geometry, [face, metal], position);
  }

  return {
    group, metal, glass, darkMetal, glow, wire, geometries, add, box, ball, tube, extrusion,
    dispose() {
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
    },
  };
}

export function buildCardModel(build: ModelBuilder) {
  const model = createModel();
  build(model);
  const bounds = new THREE.Box3().setFromObject(model.group);
  const rig = new THREE.Group();
  rig.add(model.group);
  model.group.position.sub(bounds.getCenter(new THREE.Vector3()));
  return { rig, size: bounds.getSize(new THREE.Vector3()), dispose: model.dispose };
}
