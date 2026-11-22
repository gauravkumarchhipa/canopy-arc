import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { studioFinishes } from "./studio-finishes";

export type SculptureVariant = "security" | "team" | "about" | "cookies" | "terms";

function makeShieldOutline() {
  const shield = new THREE.Shape();
  shield.moveTo(0, 1.48);
  shield.bezierCurveTo(0.38, 1.23, 0.76, 1.17, 1.13, 1.1);
  shield.lineTo(1.04, -0.12);
  shield.bezierCurveTo(0.99, -0.78, 0.45, -1.2, 0, -1.5);
  shield.bezierCurveTo(-0.45, -1.2, -0.99, -0.78, -1.04, -0.12);
  shield.lineTo(-1.13, 1.1);
  shield.bezierCurveTo(-0.76, 1.17, -0.38, 1.23, 0, 1.48);
  return shield;
}

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
  const materials = new Set([silver, ceramic, graphite, line, halo]);
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
    const shield = makeShieldOutline();
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
  } else if (variant === "team") {
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
  } else if (variant === "about") {
    const arch = new THREE.Shape();
    arch.moveTo(-1.28, -1);
    arch.lineTo(-1.28, 0.12);
    arch.bezierCurveTo(-1.28, 0.82, -0.71, 1.39, 0, 1.39);
    arch.bezierCurveTo(0.71, 1.39, 1.28, 0.82, 1.28, 0.12);
    arch.lineTo(1.28, -1);
    arch.lineTo(0.93, -1);
    arch.lineTo(0.93, 0.12);
    arch.bezierCurveTo(0.93, 0.63, 0.51, 1.04, 0, 1.04);
    arch.bezierCurveTo(-0.51, 1.04, -0.93, 0.63, -0.93, 0.12);
    arch.lineTo(-0.93, -1);
    arch.closePath();

    const archGeometry = new THREE.ExtrudeGeometry(arch, {
      depth: 0.22, bevelEnabled: true, bevelSize: 0.042, bevelThickness: 0.04, bevelSegments: 3, curveSegments: 28,
    });
    const archTiers = [
      { x: 0.55, z: -0.78, scale: 0.86, material: silver },
      { x: 0.04, z: -0.20, scale: 1.16, material: ceramic },
      { x: -0.52, z: 0.41, scale: 1, material: silver },
    ];
    for (const { x, z, scale, material } of archTiers) {
      add(archGeometry, [material, silver], [x, scale - 1, z]).scale.setScalar(scale);
    }

    const rim = new THREE.Path();
    rim.moveTo(-1.11, -0.97);
    rim.lineTo(-1.11, 0.12);
    rim.bezierCurveTo(-1.11, 0.73, -0.61, 1.22, 0, 1.22);
    rim.bezierCurveTo(0.61, 1.22, 1.11, 0.73, 1.11, 0.12);
    rim.lineTo(1.11, -0.97);
    const trace = new THREE.CurvePath<THREE.Vector3>();
    const points = rim.getPoints(28).map(({ x, y }) => new THREE.Vector3(x - 0.52, y, 0.678));
    for (let i = 1; i < points.length; i++) trace.add(new THREE.LineCurve3(points[i - 1], points[i]));
    add(new THREE.TubeGeometry(trace, 128, 0.013, 6), halo);
    add(new RoundedBoxGeometry(3.84, 0.14, 2.18, 4, 0.06), graphite, [0, -1.13, -0.06]);
    add(new RoundedBoxGeometry(3.64, 0.07, 2.00, 3, 0.035), silver, [0, -1.04, -0.06]);
    group.rotation.set(0.06, -0.48, -0.04);
  } else if (variant === "cookies") {
    const radius = 1.34;
    const edge = 0.82;
    const cookie = new THREE.Shape();
    cookie.absarc(0, 0, radius, edge, Math.PI * 2 + 0.1, false);
    cookie.bezierCurveTo(1.08, 0.08, 0.87, 0.30, 0.94, 0.53);
    cookie.bezierCurveTo(0.69, 0.47, 0.63, 0.78, radius * Math.cos(edge), radius * Math.sin(edge));
    cookie.closePath();

    const geometry = new THREE.ExtrudeGeometry(cookie, {
      depth: 0.19, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.055, bevelSegments: 5, curveSegments: 52,
    });
    add(geometry, [silver, silver], [0.30, -0.19, -0.32]).rotation.z = 0.17;
    add(geometry, [ceramic, silver], [-0.18, 0, 0.18]);
    const chips = new THREE.SphereGeometry(0.08, 16, 12);
    for (const [x, y] of [[-0.54, 0.60], [0.16, 0.72], [-0.93, 0.04], [-0.17, 0.07], [0.44, 0.17], [-0.56, -0.53], [0.1, -0.82]]) {
      add(chips, graphite, [x, y, 0.44]).scale.z = 0.48;
    }
    const crumb = new THREE.DodecahedronGeometry(0.10);
    for (const [x, y, size] of [[1.17, 0.88, 1], [1.49, 0.58, 0.64], [1.56, 1.24, 0.73]]) {
      add(crumb, halo, [x, y, 0.2]).scale.setScalar(size);
    }
    const badgeFace = new THREE.MeshStandardMaterial({
      color: studioFinishes.dark.glass, metalness: 0.36, roughness: 0.39,
    });
    materials.add(badgeFace);
    const badge = new THREE.ExtrudeGeometry(makeShieldOutline(), {
      depth: 0.11, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.04, bevelSegments: 3, curveSegments: 20,
    });
    add(badge, [badgeFace, silver], [0.75, -0.69, 0.43]).scale.set(0.32, 0.32, 0.78);
    tube([
      new THREE.Vector3(0.60, -0.68, 0.55),
      new THREE.Vector3(0.70, -0.78, 0.55),
      new THREE.Vector3(0.91, -0.57, 0.55),
    ], 0.023, halo);
    group.rotation.set(0.16, -0.37, -0.13);
  } else {
    const sheet = new RoundedBoxGeometry(2.18, 2.82, 0.17, 4, 0.08);
    add(sheet, silver, [0.48, 0.07, -0.37]).rotation.z = -0.17;
    add(sheet, silver, [0.13, 0.05, -0.12]).rotation.z = -0.07;
    add(sheet, ceramic, [-0.22, 0, 0.19]);
    for (const [y, width] of [[0.84, 1.22], [0.52, 1.55], [0.22, 1.55], [-0.08, 1.12]]) {
      add(new RoundedBoxGeometry(width, 0.036, 0.04, 3, 0.015), graphite, [-1.01 + width / 2, y, 0.288]);
    }
    const seal = add(new THREE.CylinderGeometry(0.31, 0.31, 0.069, 48), silver, [0.33, -0.79, 0.306]);
    seal.rotation.x = Math.PI / 2;
    add(new THREE.TorusGeometry(0.23, 0.017, 10, 48), halo, [0.33, -0.79, 0.347]);
    tube([[0.23, -0.79], [0.30, -0.86], [0.43, -0.72]].map(([x, y]) => new THREE.Vector3(x, y, 0.349)), 0.016, graphite);
    group.rotation.set(0.10, -0.38, 0.12);
  }

  const setTheme = (dark: boolean) => {
    if (variant !== "security") {
      const finish = dark ? studioFinishes.dark : studioFinishes.light;
      silver.color.set(finish.metal);
      ceramic.color.set(finish.glass);
      graphite.color.set(dark && variant !== "about" ? finish.rim : "#55483b");
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
      materials.forEach((material) => material.dispose());
    },
  };
}
