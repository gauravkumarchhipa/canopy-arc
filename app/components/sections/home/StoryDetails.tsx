import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { SceneMotion } from "./StoryExperience";
import { interfaceChart, interfaceChartSurface, interfaceDots, interfaceHighlight, interfaceLines, interfaceSurface, interfaceTilt, junctionRoutes, protectionShield, shieldOutline, storyInterfaces, strandPoint } from "./story-ribbon";
import { easeBetween, sampleStory } from "./story-timeline";

const junctions = Array.from({ length: 20 }, (_, index) => {
  const strand = junctionRoutes.findIndex((route) => route.some((node) => node === index));
  return { strand, t: junctionRoutes[strand].findIndex((node) => node === index) / 3 };
});
const nodeColor = new THREE.Color("#babbb4");
const networkNodes = {
  light: new THREE.Color("#787b75"),
  dark: new THREE.Color("#ddd9cc"),
};
const signalColor = new THREE.Color("#f4ecd9");
const lightSignal = new THREE.Color("#80603b");
const bronzeNodes = new THREE.Color("#b89460");
const amberSignal = new THREE.Color("#edc17e");

function ProtectionShield({ shield }: { shield: RefObject<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> | null> }) {
  const glass = useMemo(() => {
    const points = shieldOutline.map(([x, y]) => new THREE.Vector2(x, y));
    const geometry = new THREE.ShapeGeometry(new THREE.Shape(points));
    const positions = geometry.getAttribute("position");
    const shade = new THREE.Color();
    const colors = new Float32Array(positions.count * 3);
    for (let index = 0; index < positions.count; index++) {
      const light = THREE.MathUtils.smoothstep(positions.getY(index), -0.66, 0.61);
      shade.setScalar(0.50 + light * 0.50).toArray(colors, index * 3);
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);
  useEffect(() => () => glass.dispose(), [glass]);

  return (
    <mesh ref={shield} geometry={glass} visible={false} renderOrder={4}>
      <meshBasicMaterial vertexColors toneMapped={false} transparent depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function InterfacePanels({ panels }: { panels: RefObject<THREE.Group | null> }) {
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 2, 0.06), []);
  const chart = useMemo(() => {
    const { x, y, width, height } = interfaceChartSurface;
    const background = new THREE.Shape([
      new THREE.Vector2(x - width / 2, y - height / 2), new THREE.Vector2(x + width / 2, y - height / 2),
      new THREE.Vector2(x + width / 2, y + height / 2), new THREE.Vector2(x - width / 2, y + height / 2),
    ]);
    const points = interfaceChart.map(([x, y]) => new THREE.Vector2(x, y));
    background.holes.push(new THREE.Path(points));
    return [background, new THREE.Shape(points)];
  }, []);
  const highlight = useMemo(() => new THREE.Shape(interfaceHighlight.map(([x, y]) => new THREE.Vector2(x, y))), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group ref={panels} visible={false}>
      {storyInterfaces.map((panel) => (
        <group key={panel.x}>
          <group scale={[panel.width, panel.height, 1]}>
            <mesh geometry={geometry} scale={[1, 1, 0.035]}>
              <meshBasicMaterial {...interfaceSurface} toneMapped={false} transparent depthWrite={false} />
            </mesh>
            <mesh position-z={0.020}>
              <shapeGeometry args={[highlight]} />
              <meshBasicMaterial color="#fff8e7" toneMapped={false} transparent opacity={0.31} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            <mesh position-z={0.024}>
              <shapeGeometry args={[chart]} />
              <meshBasicMaterial attach="material-0" color={interfaceChartSurface.color} opacity={interfaceChartSurface.opacity}
                toneMapped={false} transparent depthWrite={false} side={THREE.DoubleSide} />
              <meshBasicMaterial attach="material-1" color="#e5deca" toneMapped={false} transparent opacity={0.78}
                depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            {interfaceLines.map(({ x, y, width, height, color }) => (
              <mesh key={y} position={[x, y, 0.023]}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial color={color} transparent opacity={0.72} depthWrite={false} side={THREE.DoubleSide} />
              </mesh>
            ))}
            {interfaceDots.map((x) => (
              <mesh key={x} position={[x, 0.32, 0.023]}>
                <circleGeometry args={[0.014, 12]} />
                <meshBasicMaterial color="#eee5d3" transparent opacity={0.78} depthWrite={false} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        </group>
      ))}
    </group>
  );
}

type Props = {
  motion: RefObject<SceneMotion>;
};

export default function StoryDetails({ motion }: Props) {
  const shield = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);
  const interfaces = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>>(null);
  const signal = useRef<THREE.InstancedMesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);
  const scratch = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!shield.current || !interfaces.current || !nodes.current || !signal.current) return;
    const { progress, darkTheme } = motion.current;
    const { from, to, blend } = sampleStory(progress);
    const at = (shot: number) => (from === shot ? 1 - blend : 0) + (to === shot ? blend : 0);
    const protection = at(4);
    const badge = easeBetween(protection, 0.45, 0.98);
    shield.current.visible = badge > 0.01;
    if (shield.current.visible) {
      const { center, scale, yaw } = protectionShield;
      shield.current.position.set(center[0], center[1], center[2] * badge);
      shield.current.rotation.y = yaw + (1 - badge) * 0.35;
      shield.current.scale.set(scale[0] * badge, scale[1] * badge, badge);
      shield.current.material.color.set(darkTheme ? "#ced0c8" : "#bdb3a3");
      shield.current.material.opacity = badge * (darkTheme ? 0.28 : 0.40);
    }
    const setPath = (strand: number, t: number) => {
      const a = strandPoint(from, strand, t);
      const b = strandPoint(to, strand, t);
      scratch.position.set(a[0] + (b[0] - a[0]) * blend, a[1] + (b[1] - a[1]) * blend, a[2] + (b[2] - a[2]) * blend);
    };

    const panelAmount = at(2);
    interfaces.current.visible = panelAmount > 0.02;
    if (interfaces.current.visible) {
      for (const [index, panel] of storyInterfaces.entries()) {
        const card = interfaces.current.children[index];
        const reveal = easeBetween(panelAmount, 0.12 + index * 0.055, 0.91);
        setPath(index + 4, 0.48);
        card.position.copy(scratch.position);
        card.position.lerp(scratch.position.set(panel.x, panel.y, panel.z), reveal);
        card.rotation.set(-0.48 * (1 - reveal), panel.angle + (1 - reveal) * (index - 1.5) * 0.42, interfaceTilt, "ZYX");
        card.scale.set(Math.max(0.003, reveal), Math.max(0.003, reveal ** 1.55), 0.35 + reveal * 0.65);
      }
    }

    const network = at(3) + protection;
    const junctionAmount = easeBetween(network, 0.08, 0.87);
    nodes.current.visible = junctionAmount > 0.02;
    signal.current.visible = junctionAmount > 0.02;
    if (nodes.current.visible) {
      nodes.current.material.color.copy(nodeColor).lerp(networkNodes[darkTheme ? "dark" : "light"], network);
      nodes.current.material.color.lerp(bronzeNodes, protection * 0.64);
      nodes.current.material.emissiveIntensity = darkTheme ? network * 0.16 : 0;
      for (const [index, { strand, t }] of junctions.entries()) {
        setPath(strand, t);
        scratch.scale.setScalar(junctionAmount * (0.036 + (index % 4) * 0.013));
        scratch.updateMatrix();
        nodes.current.setMatrixAt(index, scratch.matrix);
      }
      nodes.current.instanceMatrix.needsUpdate = true;
    }
    if (signal.current.visible) {
      signal.current.material.color.copy(signalColor).lerp(lightSignal, darkTheme ? 0 : network);
      signal.current.material.color.lerp(amberSignal, protection);
      for (let index = 0; index < 6; index++) {
        const travel = (progress * 18 + index * 0.184) % 1;
        setPath((index * 4 + 5) % junctionRoutes.length, travel);
        const size = junctionAmount * (0.014 + Math.sin(travel * Math.PI) * 0.028);
        scratch.scale.setScalar(size);
        scratch.updateMatrix();
        signal.current.setMatrixAt(index, scratch.matrix);
      }
      signal.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <ProtectionShield shield={shield} />
      <InterfacePanels panels={interfaces} />
      <instancedMesh ref={nodes} args={[undefined, undefined, junctions.length]} visible={false} frustumCulled={false}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial emissive="#ded7c5" emissiveIntensity={0} metalness={0.68} roughness={0.27} />
      </instancedMesh>
      <instancedMesh ref={signal} args={[undefined, undefined, 6]} visible={false} frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </>
  );
}
