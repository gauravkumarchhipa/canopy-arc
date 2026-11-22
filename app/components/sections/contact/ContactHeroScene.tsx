"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { studioFinishes } from "../../three/studio-finishes";
import type { ModelPose } from "../../three/useModelOrbit";

type Props = {
  dark: boolean;
  pose: ModelPose;
  dragging: boolean;
  onReady: () => void;
  onFailure: () => void;
};

const flaps = [
  [[-1.53, 0.8], [0, -0.23], [1.53, 0.8]],
  [[-1.53, -0.79], [-0.62, 0.19]],
  [[1.53, -0.79], [0.62, 0.19]],
] as const;

const rings = [
  { radius: 2.58, flatten: 0.40, tilt: 0.42, depth: -0.18, gauge: 0.019 },
  { radius: 2.71, flatten: 0.44, tilt: -0.30, depth: -0.25, gauge: 0.012 },
  { radius: 2.84, flatten: 0.46, tilt: -0.30, depth: -0.34, gauge: 0.009 },
] as const;

function makeEnvelope() {
  const glass = new RoundedBoxGeometry(3.47, 1.99, 0.18, 4, 0.085);
  const frame = new RoundedBoxGeometry(3.56, 2.08, 0.2, 4, 0.095);
  const seams = flaps.map((points) => {
    const vertices = points.map(([x, y]) => new THREE.Vector3(x, y, 0.24));
    const path = new THREE.CurvePath<THREE.Vector3>();
    for (let i = 1; i < vertices.length; i++) {
      path.add(new THREE.LineCurve3(vertices[i - 1], vertices[i]));
    }
    return new THREE.TubeGeometry(path, 36, 0.023, 8);
  });
  const orbits = rings.map(({ radius, flatten, tilt, depth, gauge }) => {
    const points = Array.from({ length: 72 }, (_, index) => {
      const phase = index / 72 * Math.PI * 2;
      const x = Math.cos(phase) * radius;
      const y = Math.sin(phase) * radius * flatten;
      return new THREE.Vector3(x * Math.cos(tilt) - y * Math.sin(tilt),
        x * Math.sin(tilt) + y * Math.cos(tilt), depth + Math.sin(phase) * 0.42);
    });
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 96, gauge, 6, true);
  });
  return { glass, frame, seams, orbits };
}

function Envelope({ dark, pose, dragging, onReady, onFailure }: Props) {
  const { gl, get, invalidate } = useThree();
  const model = useRef<THREE.Group>(null);
  const ready = useRef(false);
  const finish = dark ? studioFinishes.dark : studioFinishes.light;
  const { glass, frame, seams, orbits } = useMemo(() => makeEnvelope(), []);

  useEffect(() => {
    const { scene } = get();
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const reflections = generator.fromScene(room, 0.04, 0.1, 25, { size: 64 });
    scene.environment = reflections.texture;
    room.dispose();
    generator.dispose();
    invalidate();
    return () => {
      scene.environment = null;
      reflections.dispose();
    };
  }, [get, gl, invalidate]);

  useEffect(() => {
    gl.domElement.addEventListener("webglcontextlost", onFailure);
    return () => gl.domElement.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);

  useEffect(() => () => {
    glass.dispose();
    frame.dispose();
    seams.forEach((geometry) => geometry.dispose());
    orbits.forEach((geometry) => geometry.dispose());
  }, [frame, glass, orbits, seams]);

  useEffect(() => { invalidate(); }, [dark, dragging, invalidate, pose]);

  useFrame(({ camera, size }, delta) => {
    if (!model.current) return;
    const view = camera as THREE.OrthographicCamera;
    const zoom = Math.min(size.width / 6.15, size.height / 3.50);
    if (view.zoom !== zoom) {
      view.zoom = zoom;
      view.updateProjectionMatrix();
    }
    const rotation = model.current.rotation;
    const immediate = dragging || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = THREE.MathUtils.clamp(delta, 1 / 60, 0.05);
    rotation.x = immediate ? pose.pitch : THREE.MathUtils.damp(rotation.x, pose.pitch, 9, step);
    rotation.y = immediate ? pose.yaw : THREE.MathUtils.damp(rotation.y, pose.yaw, 9, step);
    if (Math.abs(rotation.x - pose.pitch) + Math.abs(rotation.y - pose.yaw) > 0.001) invalidate();
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
  });

  return (
    <>
      <hemisphereLight args={["#fff4e2", "#8c8074", 0.9]} />
      <directionalLight color="#fff9ed" intensity={2.4} position={[-3, 5, 4]} />
      <directionalLight color="#f5f4ef" intensity={2.6} position={[3, 0, -4]} />
      <group ref={model} rotation={[-0.15, -0.28, 0, "YXZ"]}>
        {orbits.map((geometry, index) => (
          <mesh key={geometry.uuid} geometry={geometry}>
            <meshStandardMaterial color={index === 0 ? finish.bronze : finish.ribbon}
              metalness={0.73} roughness={0.35} emissive={index === 0 ? finish.bronze : finish.rim}
              emissiveIntensity={dark ? 0.25 : 0.08} />
          </mesh>
        ))}
        <group rotation-z={-0.14}>
          <mesh geometry={frame} position={[0.25, -0.16, -0.28]} rotation-z={0.04}>
            <meshPhysicalMaterial color={finish.ribbon} metalness={0.8} roughness={0.36} />
          </mesh>
          <mesh geometry={frame} position-z={0.04}>
            <meshPhysicalMaterial color={finish.metal} metalness={0.8} roughness={0.27} clearcoat={0.72} />
          </mesh>
          <mesh geometry={glass} position-z={0.13}>
            <meshPhysicalMaterial color={finish.glass} metalness={0.26} roughness={0.29}
              clearcoat={0.82} opacity={dark ? 0.91 : 0.81} transparent />
          </mesh>
          {seams.map((geometry, index) => (
            <mesh key={geometry.uuid} geometry={geometry}>
              <meshStandardMaterial color={index === 0 ? finish.bronze : finish.rim} metalness={0.42}
                roughness={0.3} emissive={finish.bronze} emissiveIntensity={dark && index === 0 ? 0.3 : 0.08} />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}

export default function ContactHeroScene(props: Props) {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 10], near: 0.1, far: 30 }}
      frameloop="demand" dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={null}>
      <Envelope {...props} />
    </Canvas>
  );
}
