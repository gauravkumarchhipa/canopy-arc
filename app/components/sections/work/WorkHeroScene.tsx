"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { ParametricGeometry } from "three/addons/geometries/ParametricGeometry.js";
import type { ModelPose } from "../../three/useModelOrbit";
import { studioFinishes } from "../../three/studio-finishes";

type Props = {
  dark: boolean;
  pose: ModelPose;
  dragging: boolean;
  onReady: () => void;
  onFailure: () => void;
};

const panels = [
  { position: [0.9, -0.13, -0.80], scale: 0.98 },
  { position: [0.38, 0.02, -0.15], scale: 1.03 },
  { position: [-0.28, 0.16, 0.57], scale: 1.10 },
] as const;
const panelWidth = 2.75;
const panelHeight = 1.95;

function makeRibbons() {
  return [
    { depth: -0.94, width: 0.84, behind: true, offset: 0 },
    { depth: 0.80, width: 0.55, behind: false, offset: 0 },
    { depth: 1.22, width: 0.34, behind: false, offset: -0.28 },
  ].map(({ depth, width, behind, offset }) => {
    function point(t: number, across: number, target: THREE.Vector3) {
      const wave = behind ? 2.8 * Math.exp(-(((t - 0.57) / 0.24) ** 2))
        : 0.54 * Math.cos(t * Math.PI * 2.9 + 0.35) + 0.94 * t;
      const bank = 0.35 + 0.65 * Math.sin(t * Math.PI * 1.55);
      return target.set((t - 0.5) * 6.5,
        (behind ? -1.27 : -1.53) + wave + offset + across * width * bank,
        depth + across * width * 0.83 + 0.3 * Math.sin(t * Math.PI * 2));
    }
    const surface = new ParametricGeometry((t, v, target) => { point(t, v - 0.5, target); }, 64, 8);
    const edge = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: 41 }, (_, index) => (
      point(index / 40, 0.5, new THREE.Vector3())
    ))), 80, 0.012, 6, false);
    return { surface, edge };
  });
}

function makeChart() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.76, -0.43);
  shape.lineTo(-0.18, 0.17);
  shape.lineTo(0.12, -0.11);
  shape.lineTo(0.53, 0.30);
  shape.lineTo(0.83, -0.43);
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth: 0.022, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 });
}

function Model({ dark, pose, dragging, onReady, onFailure }: Props) {
  const { gl, get, invalidate } = useThree();
  const finish = dark ? studioFinishes.dark : studioFinishes.light;
  const model = useRef<THREE.Group>(null);
  const drawn = useRef(false);
  const panel = useMemo(() => new RoundedBoxGeometry(panelWidth, panelHeight, 0.12, 4, 0.057), []);
  const frame = useMemo(() => new RoundedBoxGeometry(panelWidth + 0.045, panelHeight + 0.045, 0.075, 4, 0.037), []);
  const chart = useMemo(() => makeChart(), []);
  const ribbons = useMemo(() => makeRibbons(), []);

  useEffect(() => { invalidate(); }, [dark, dragging, invalidate, pose]);

  useEffect(() => {
    const { scene } = get();
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const reflection = generator.fromScene(room, 0.02, 0.1, 25, { size: 64 });
    scene.environment = reflection.texture;
    room.dispose();
    generator.dispose();
    invalidate();
    return () => {
      scene.environment = null;
      reflection.dispose();
    };
  }, [gl, get, invalidate]);

  useEffect(() => {
    gl.domElement.addEventListener("webglcontextlost", onFailure);
    return () => gl.domElement.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);

  useEffect(() => () => {
    panel.dispose();
    frame.dispose();
    chart.dispose();
    ribbons.forEach(({ surface, edge }) => { surface.dispose(); edge.dispose(); });
  }, [panel, frame, chart, ribbons]);

  useFrame(({ camera, size }, delta) => {
    if (!model.current) return;
    const view = camera as THREE.OrthographicCamera;
    const zoom = Math.min(size.width / 7.25, size.height / 4.75);
    if (view.zoom !== zoom) {
      view.zoom = zoom;
      view.updateProjectionMatrix();
    }
    const rotation = model.current.rotation;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const time = Math.max(1 / 60, Math.min(0.05, delta));
    rotation.x = dragging || reduced ? pose.pitch : THREE.MathUtils.damp(rotation.x, pose.pitch, 6, time);
    rotation.y = dragging || reduced ? pose.yaw : THREE.MathUtils.damp(rotation.y, pose.yaw, 6, time);
    if (Math.abs(rotation.x - pose.pitch) + Math.abs(rotation.y - pose.yaw) > 0.001) invalidate();
    if (!drawn.current) {
      drawn.current = true;
      onReady();
    }
  });

  return (
    <>
      <ambientLight color="#fff1e5" intensity={0.48} />
      <directionalLight position={[-3, 5, 4]} color="#fff9e9" intensity={2.0} />
      <directionalLight position={[4, 2, -3]} color="#e3eaff" intensity={2.1} />
      <pointLight position={[1.1, -1.8, 2.6]} color="#ffca8f" intensity={6} distance={7} />
      <group ref={model} rotation-order="YXZ">
        {ribbons.map(({ surface, edge }, index) => (
          <group key={surface.uuid}>
            <mesh geometry={surface}>
              <meshPhysicalMaterial side={THREE.DoubleSide} color={index === 0 ? finish.ribbon : finish.metal}
                metalness={0.7} roughness={0.32} clearcoat={0.62} />
            </mesh>
            <mesh geometry={edge}>
              <meshBasicMaterial color={index === 0 ? finish.rim : finish.bronze} toneMapped={false} />
            </mesh>
          </group>
        ))}
        {panels.map(({ position, scale }, index) => (
          <group key={index} position={position} scale={scale} rotation={[-0.18, -0.26, 0.15]}>
            <mesh geometry={frame}>
              <meshPhysicalMaterial color={finish.metal} metalness={0.72} roughness={0.26} transparent opacity={0.56} />
            </mesh>
            <mesh geometry={panel} position-z={0.028}>
              <meshPhysicalMaterial color={finish.glass} metalness={0.38}
                roughness={0.27} clearcoat={0.78} transparent opacity={dark ? 0.82 : 0.68} />
            </mesh>
            {[-0.16, 0, 0.16].map((x) => (
              <mesh key={x} position={[0.98 + x, 0.75, 0.095]}>
                <sphereGeometry args={[0.039, 12, 8]} />
                <meshStandardMaterial color={finish.rim} roughness={0.34} />
              </mesh>
            ))}
            {index === 2 && (
              <>
                <mesh position={[-0.22, 0.49, 0.103]} rotation-z={Math.PI / 2}>
                  <capsuleGeometry args={[0.033, 1.38, 5, 12]} />
                  <meshStandardMaterial color={finish.rim} roughness={0.39} />
                </mesh>
                <mesh geometry={chart} position={[0, -0.08, 0.09]}>
                  <meshPhysicalMaterial color={finish.rim} roughness={0.26} metalness={0.34} />
                </mesh>
              </>
            )}
          </group>
        ))}
      </group>
    </>
  );
}

export default function WorkHeroScene(props: Props) {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 12], near: 0.1, far: 35 }}
      frameloop="demand" dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}
      fallback={null}>
      <Model {...props} />
    </Canvas>
  );
}
