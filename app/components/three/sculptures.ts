import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { studioFinishes } from "./studio-finishes";

export type SculptureVariant = "security" | "team";

export function buildSculpture(variant: SculptureVariant) {
  const group = new THREE.Group();
  const silver = new THREE.MeshStandardMaterial({
    metalness: 0.92,
    roughness: 0.25,
  });
  const ceramic = new THREE.MeshStandardMaterial({
    metalness: 0.12,
    roughness: 0.36,
  });
  const graphite = new THREE.MeshStandardMaterial({
    metalness: 0.65,
    roughness: 0.3,
  });
  const line = new THREE.MeshStandardMaterial({
    metalness: 0.8,
    roughness: 0.32,
  });
  const halo = new THREE.MeshStandardMaterial({
    color: "#fff0d5",
    emissive: "#ffd4a1",
    emissiveIntensity: 0.72,
    roughness: 0.25,
  });
  const materials = { silver, ceramic, graphite, line, halo };
  const geometries = new Set<THREE.BufferGeometry>();
  const add = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material | THREE.Material[],
    position: [number, number, number] = [0, 0, 0],
  ) => {
    geometries.add(geometry);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    group.add(mesh);
    return mesh;
  };
  const tube = (
    points: THREE.Vector3[],
    thickness: number,
    material = silver,
    closed = false,
  ) =>
    add(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points, closed),
        64,
        thickness,
        8,
        closed,
      ),
      material,
    );

  if (variant === "security") {
    const shield = new THREE.Shape();
    shield.moveTo(0, 1.48);
    shield.bezierCurveTo(0.38, 1.23, 0.76, 1.17, 1.13, 1.1);
    shield.lineTo(1.04, -0.12);
    shield.bezierCurveTo(0.99, -0.78, 0.45, -1.2, 0, -1.5);
    shield.bezierCurveTo(-0.45, -1.2, -0.99, -0.78, -1.04, -0.12);
    shield.lineTo(-1.13, 1.1);
    shield.bezierCurveTo(-0.76, 1.17, -0.38, 1.23, 0, 1.48);
    const geometry = new THREE.ExtrudeGeometry(shield, {
      depth: 0.24,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.075,
      bevelThickness: 0.07,
      curveSegments: 32,
    });
    add(geometry, [ceramic, silver]);
    const outline = shield
      .getPoints(96)
      .map((point) => new THREE.Vector3(point.x, point.y, 0.36));
    const rim = tube(outline, 0.024, silver, true);
    rim.scale.set(0.89, 0.89, 1);
    const innerRim = tube(
      outline.map(
        (point) => new THREE.Vector3(point.x * 0.76, point.y * 0.76, 0.39),
      ),
      0.009,
      line,
      true,
    );
    innerRim.position.z = 0.005;
    add(
      new RoundedBoxGeometry(0.77, 0.67, 0.22, 5, 0.09),
      silver,
      [0, -0.18, 0.51],
    );
    const shackle = Array.from({ length: 33 }, (_, index) => {
      const angle = Math.PI - (index / 32) * Math.PI;
      return new THREE.Vector3(
        Math.cos(angle) * 0.27,
        0.15 + Math.sin(angle) * 0.34,
        0.52,
      );
    });
    tube(shackle, 0.045);
    const keyhole = add(
      new THREE.CylinderGeometry(0.065, 0.065, 0.015, 24),
      graphite,
      [0, -0.12, 0.63],
    );
    keyhole.rotation.x = Math.PI / 2;
    add(new THREE.BoxGeometry(0.045, 0.12, 0.017), graphite, [0, -0.2, 0.63]);
    // Two offset perimeter arcs express layers of protection around the core.
    for (const [scale, depth] of [
      [1.14, -0.21],
      [1.27, -0.51],
    ]) {
      tube(
        shield
          .getPoints(96)
          .map(
            (point) =>
              new THREE.Vector3(point.x * scale, point.y * scale, depth),
          ),
        0.016,
        line,
        true,
      );
    }
    group.rotation.set(0.05, -0.32, -0.06);
  } else {
    // Eight linked modules refer to the eight profiles shown on the team page.
    const nodes = Array.from({ length: 8 }, (_, index) => {
      const angle = (index / 8) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * 1.65,
        Math.sin(angle) * 1.25,
        Math.sin(angle * 2) * 0.36,
      );
    });
    nodes.forEach((point, index) => {
      const node = add(
        new RoundedBoxGeometry(0.42, 0.42, 0.42, 4, 0.1),
        index % 2 ? ceramic : silver,
        point.toArray() as [number, number, number],
      );
      node.rotation.set(0.15 + index * 0.13, 0.35 + index * 0.25, Math.PI / 4);
      const next = nodes[(index + 1) % nodes.length];
      const midpoint = point.clone().add(next).multiplyScalar(0.55);
      midpoint.z += 0.22;
      tube([point, midpoint, next], 0.025, silver);
      const inward = point.clone().multiplyScalar(0.48);
      inward.z = 0.32;
      tube([point, inward, new THREE.Vector3(0, 0, 0.15)], 0.012, line);
    });
    const core = add(
      new RoundedBoxGeometry(0.67, 0.67, 0.67, 5, 0.15),
      silver,
      [0, 0, 0.15],
    );
    core.rotation.set(0.35, 0.35, Math.PI / 4);
    const center = add(
      new RoundedBoxGeometry(0.22, 0.22, 0.08, 3, 0.04),
      graphite,
      [0, 0, 0.6],
    );
    center.rotation.z = Math.PI / 4;
    for (const [radius, slope, depth] of [[2.12, -0.22, 0.7], [2.26, 0.32, -0.72]]) {
      const orbit = Array.from({ length: 72 }, (_, index) => {
        const angle = index / 72 * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        return new THREE.Vector3(x, Math.sin(angle) * 0.73 + x * slope, Math.sin(angle) * depth);
      });
      tube(orbit, 0.008, halo, true);
    }
    group.rotation.set(0.16, -0.35, -0.12);
  }

  const setTheme = (dark: boolean) => {
    if (variant === "team") {
      const finish = dark ? studioFinishes.dark : studioFinishes.light;
      silver.color.set(finish.metal);
      ceramic.color.set(finish.glass);
      graphite.color.set(dark ? finish.rim : "#55483b");
      line.color.set(finish.ribbon);
      halo.color.set(finish.bronze);
      halo.emissive.set(finish.bronze);
      halo.emissiveIntensity = dark ? 0.42 : 0.16;
      return;
    }

    silver.color.set(dark ? "#c6c2b8" : "#a9a69c");
    ceramic.color.set(dark ? "#383832" : "#e7e4dc");
    graphite.color.set(dark ? "#89867d" : "#35352f");
    line.color.set(dark ? "#99968c" : "#9c998d");
  };
  return {
    group,
    setTheme,
    dispose: () => {
      geometries.forEach((geometry) => geometry.dispose());
      Object.values(materials).forEach((material) => material.dispose());
    },
  };
}
