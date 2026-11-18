"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { chapters, lastChapter } from "./story-chapters";
import type { SceneMotion } from "./StoryExperience";
import { makeBrainNetwork, makeNetwork, makeStrands, stageFloorY, storyCamera, storyPanels, strandCount, strandPoint } from "./story-geometry";
import { glassFragment, glassVertex, reflectionFragment, reflectionVertex } from "./story-shaders";

type Props = {
  motion: RefObject<SceneMotion>;
  visible: boolean;
  onReady: () => void;
  onFailure: () => void;
};

const { azimuths: cameraTracks, distances: cameraDistances, elevations } = storyCamera;
const orbitColors = {
  light: [new THREE.Color("#94623a"), new THREE.Color("#a98768")],
  dark: [new THREE.Color("#ffddb0"), new THREE.Color("#dfc5a1")],
};
const networkColors = {
  light: new THREE.Color("#826247"),
  dark: new THREE.Color("#f0d9b9"),
};

function Studio({ onFailure }: Pick<Props, "onFailure">) {
  const get = useThree((state) => state.get);
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const { scene } = get();
    const studio = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const texture = generator.fromScene(studio, 0.02, 0.1, 50, { size: 128 });
    scene.environment = texture.texture;
    scene.environmentIntensity = 0.92;
    studio.dispose();
    generator.dispose();
    return () => {
      scene.environment = null;
      texture.dispose();
    };
  }, [gl, get]);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);

  return (
    <>
      <ambientLight intensity={0.33} color="#e8e1d5" />
      <directionalLight position={[-3, 5, 4]} intensity={2.2} color="#fff9ed" />
      <directionalLight position={[5, 2, -3]} intensity={2.75} color="#f9fcff" />
      <pointLight position={[-1.55, -1.35, 1.28]} color="#ffbc72" intensity={5.5} distance={5} decay={2} />
      <pointLight position={[1.75, -1.46, 0.95]} color="#ffe3ba" intensity={3.2} distance={4} decay={2} />
    </>
  );
}

function makeGlow(streak = false) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 96;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, "#fffefa");
  gradient.addColorStop(0.07, "#fff2cf");
  gradient.addColorStop(0.21, "rgba(252,200,135,0.63)");
  gradient.addColorStop(0.51, "rgba(237,175,105,0.15)");
  gradient.addColorStop(1, "rgba(237,175,105,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);
  if (streak) {
    context.translate(48, 48);
    context.fillStyle = "#fff5d9";
    context.beginPath();
    context.moveTo(-7, 0);
    context.quadraticCurveTo(-1, -1, 0, -7);
    context.quadraticCurveTo(1, -1, 7, 0);
    context.quadraticCurveTo(1, 1, 0, 7);
    context.quadraticCurveTo(-1, 1, -7, 0);
    context.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeShield() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.61);
  shape.quadraticCurveTo(0.22, 0.43, 0.5, 0.4);
  shape.lineTo(0.46, -0.05);
  shape.quadraticCurveTo(0.38, -0.49, 0, -0.66);
  shape.quadraticCurveTo(-0.38, -0.49, -0.46, -0.05);
  shape.lineTo(-0.5, 0.4);
  shape.quadraticCurveTo(-0.22, 0.43, 0, 0.61);
  const body = new THREE.ExtrudeGeometry(shape, {
    depth: 0.055,
    bevelEnabled: true,
    bevelThickness: 0.037,
    bevelSize: 0.029,
    bevelSegments: 3,
    curveSegments: 18,
  });
  const edge = shape.getPoints(15).slice(0, -1).map(({ x, y }) => new THREE.Vector3(x, y, 0.097));
  const rim = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(edge, true), 100, 0.018, 8, true);
  return { body, rim };
}

function makeChart() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.27, -0.18);
  shape.lineTo(-0.06, 0.09);
  shape.lineTo(0.04, -0.015);
  shape.lineTo(0.16, 0.15);
  shape.lineTo(0.27, 0.015);
  shape.lineTo(0.27, -0.18);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function Sculpture({ motion, visible, onReady }: Omit<Props, "onFailure">) {
  const { invalidate, camera, size } = useThree();
  const art = useRef<THREE.Group>(null);
  const strands = useRef<THREE.Mesh>(null);
  const filament = useRef<THREE.MeshPhysicalMaterial>(null);
  const reflection = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const glass = useRef<THREE.Mesh>(null);
  const glassMaterial = useRef<THREE.ShaderMaterial>(null);
  const rings = useRef<THREE.Group>(null);
  const panels = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Points>(null);
  const floorLights = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);
  const network = useRef<THREE.Group>(null);
  const networkLines = useRef<THREE.LineBasicMaterial>(null);
  const networkLights = useRef<THREE.PointsMaterial>(null);
  const networkAccents = useRef<THREE.PointsMaterial>(null);
  const brain = useRef<THREE.Group>(null);
  const brainLines = useRef<THREE.LineBasicMaterial>(null);
  const brainLights = useRef<THREE.PointsMaterial>(null);
  const brainAccents = useRef<THREE.PointsMaterial>(null);
  const shield = useRef<THREE.Group>(null);
  const core = useRef<THREE.Sprite>(null);
  const orbit = useRef(0);
  const night = useRef(0);
  const entrance = useRef(0);
  const elapsed = useRef(0);
  const paintedFrames = useRef(0);
  const samples = useMemo(() => [new THREE.Vector3(), new THREE.Vector3()], []);
  const ribbonGeometry = useMemo(() => makeStrands(), []);
  const shieldGeometry = useMemo(() => makeShield(), []);
  const glow = useMemo(() => makeGlow(), []);
  const flare = useMemo(() => makeGlow(true), []);
  const panelGeometry = useMemo(() => new RoundedBoxGeometry(1.92, 1.25, 0.075, 3, 0.035), []);
  const panelEdges = useMemo(() => {
    const corner = 0.075;
    const x = 0.96;
    const y = 0.625;
    const shape = new THREE.Shape();
    shape.moveTo(-x + corner, -y);
    shape.lineTo(x - corner, -y);
    shape.quadraticCurveTo(x, -y, x, -y + corner);
    shape.lineTo(x, y - corner);
    shape.quadraticCurveTo(x, y, x - corner, y);
    shape.lineTo(-x + corner, y);
    shape.quadraticCurveTo(-x, y, -x, y - corner);
    shape.lineTo(-x, -y + corner);
    shape.quadraticCurveTo(-x, -y, -x + corner, -y);
    return new THREE.BufferGeometry().setFromPoints(shape.getPoints(8));
  }, []);
  const chart = useMemo(() => makeChart(), []);
  const networkGeometry = useMemo(() => makeNetwork(), []);
  const brainGeometry = useMemo(() => makeBrainNetwork(), []);
  const dots = useMemo(() => new Float32Array(78 * 3), []);
  const footings = useMemo(() => new Float32Array(16 * 3), []);
  const glassUniforms = useMemo(() => ({
    strength: { value: 1 },
    night: { value: 0 },
  }), []);
  const reflectionUniforms = useMemo(() => ({
    strength: { value: 0 },
    floorY: { value: stageFloorY },
  }), []);

  useEffect(() => () => {
    const resources = [ribbonGeometry, shieldGeometry.body, shieldGeometry.rim, glow, flare,
      panelGeometry, panelEdges, chart, ...Object.values(networkGeometry), ...Object.values(brainGeometry)];
    for (const resource of resources) {
      resource?.dispose();
    }
  }, [ribbonGeometry, shieldGeometry, glow, flare, panelGeometry, panelEdges, chart, networkGeometry, brainGeometry]);

  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    let last = 0;
    const loop = (time: number) => {
      if (time - last >= 32) {
        last = time;
        invalidate();
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [invalidate, visible]);

  useFrame((_, delta) => {
    if (!art.current || !strands.current || !filament.current || !reflection.current || !glass.current || !glassMaterial.current ||
      !rings.current || !panels.current || !nodes.current || !network.current || !floorLights.current ||
      !networkLines.current || !networkLights.current || !networkAccents.current || !shield.current || !core.current ||
      !brain.current || !brainLines.current || !brainLights.current || !brainAccents.current) return;

    const dt = Math.min(delta, 0.05);
    elapsed.current += dt;
    entrance.current = Math.min(1, entrance.current + dt * 0.72);
    const time = elapsed.current;
    const state = motion.current;
    const from = Math.min(lastChapter - 1, Math.floor(state.chapter));
    const to = from + 1;
    const blend = THREE.MathUtils.smoothstep(state.chapter - from, 0.03, 0.97);
    const influences = strands.current.morphTargetInfluences!;
    const reflectionInfluences = reflection.current.morphTargetInfluences!;
    for (let index = 1; index < chapters.length; index++) {
      const weight = index === from ? 1 - blend : index === to ? blend : 0;
      influences[index - 1] = reflectionInfluences[index - 1] = weight;
    }

    const spark = 1 - THREE.MathUtils.smoothstep(state.chapter, 0.12, 0.85);
    const engineering = 1 - THREE.MathUtils.smoothstep(Math.abs(state.chapter - 2), 0.15, 0.81);
    const intelligence = 1 - THREE.MathUtils.smoothstep(Math.abs(state.chapter - 3), 0.24, 0.84);
    const protection = 1 - THREE.MathUtils.smoothstep(Math.abs(state.chapter - 4), 0.18, 0.82);
    const structure = influences[0];
    const outcome = influences[lastChapter - 1];

    orbit.current = THREE.MathUtils.damp(orbit.current, state.orbit, 8, dt);
    night.current = THREE.MathUtils.damp(night.current, state.night, 7, dt);
    const lit = 1 - night.current;
    const intro = 1 - THREE.MathUtils.smoothstep(entrance.current, 0, 1);
    const azimuth = orbit.current + THREE.MathUtils.lerp(cameraTracks[from], cameraTracks[to], blend) + 0.23 * intro * spark;
    const framing = Math.max(1, 1.37 / (size.width / size.height));
    const distance = (THREE.MathUtils.lerp(cameraDistances[from], cameraDistances[to], blend) + intro * 0.5 * spark) * framing;
    const elevation = THREE.MathUtils.lerp(elevations[from], elevations[to], blend) + intro * 0.17 * spark;
    camera.position.set(Math.sin(azimuth) * distance, elevation, Math.cos(azimuth) * distance);
    const sideClearance = size.width > 560 ? outcome * 0.33 : 0;
    camera.lookAt(-Math.cos(azimuth) * sideClearance, -0.05 + (structure + outcome) * 0.19,
      Math.sin(azimuth) * sideClearance);
    art.current.position.y = Math.sin(time * 0.72) * (0.045 * spark + 0.018) * (1 - Math.max(structure, outcome));
    filament.current.roughness = THREE.MathUtils.lerp(0.29, 0.17, night.current);
    filament.current.color.setScalar(1 - lit * 0.12);
    filament.current.emissiveIntensity = 0.015 + night.current * 0.066;
    filament.current.opacity = (1 - engineering * 0.74 - Math.max(spark * 0.32, protection * 0.56)) * (1 - intelligence);
    filament.current.depthWrite = engineering < 0.55 && intelligence < 0.5;
    reflection.current.visible = structure + outcome > 0.025;
    reflection.current.material.uniforms.strength.value = structure * 0.24 + outcome * 0.41;
    floorLights.current.visible = reflection.current.visible;
    floorLights.current.material.opacity = structure * 0.32 + outcome * 0.62;
    if (floorLights.current.visible) {
      const position = floorLights.current.geometry.attributes.position;
      for (let index = 0; index < position.count; index++) {
        const strand = Math.floor(index / 2) * 3 + 1;
        const end = index % 2;
        strandPoint(from, strand, end, samples[0]);
        strandPoint(to, strand, end, samples[1]);
        samples[0].lerp(samples[1], blend);
        position.setXYZ(index, samples[0].x, samples[0].y + 0.014, samples[0].z);
      }
      position.needsUpdate = true;
    }

    const shell = Math.max(spark * 0.94, protection);
    glass.current.visible = shell > 0.01;
    glass.current.scale.setScalar(1.24 + protection * 0.34);
    glassMaterial.current.uniforms.strength.value = shell;
    glassMaterial.current.uniforms.night.value = night.current;
    rings.current.visible = shell + intelligence > 0.03;
    rings.current.rotation.y = Math.sin(time * 0.24) * 0.16;
    rings.current.children.forEach((ring, index) => {
      const mesh = ring as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
      const accent = index === 0 ? 0 : 1;
      mesh.material.color.lerpColors(orbitColors.light[accent], orbitColors.dark[accent], night.current);
      mesh.material.opacity = Math.max(shell * (accent === 0 ? 0.87 : 0.43 + lit * 0.18), index === 1 ? intelligence * 0.31 : 0);
      mesh.rotation.x = 1.12 + index * 0.26 + Math.sin(time * 0.16 + index) * 0.08;
      const glint = mesh.children[0] as THREE.Sprite;
      const angle = time * 0.42 + index * 2.1;
      const radius = 1.71 + index * 0.28;
      glint.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      glint.material.opacity = shell * (index === 0 ? 0.91 : 0.53);
    });
    core.current.visible = spark > 0.01;
    core.current.position.set(0.14, -0.37, 0.75);
    core.current.scale.setScalar(1.98 + Math.sin(time * 2.1) * 0.13);
    core.current.material.opacity = spark;

    panels.current.visible = engineering > 0.01;
    panels.current.scale.setScalar(0.76 + engineering * 0.24);
    panels.current.traverse((object) => {
      const material = (object as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material;
      if (material) material.opacity = engineering * (material.userData.baseOpacity as number);
    });

    shield.current.visible = protection > 0.01;
    shield.current.scale.setScalar(0.72 + protection * 0.38);
    shield.current.rotation.y = -0.34 + (1 - protection) * 0.5;
    shield.current.traverse((object) => {
      const material = (object as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material;
      if (material) material.opacity = protection * (material.userData.baseOpacity as number);
    });

    network.current.visible = spark + protection > 0.02;
    const networkScale = 1 - protection * 0.29;
    network.current.scale.set(networkScale - spark * 0.44, networkScale + spark * 0.05, networkScale - spark * 0.14);
    network.current.position.y = -protection * 0.12;
    network.current.rotation.set(0.09, Math.sin(time * 0.23) * 0.15, 0);
    networkLines.current.color.lerpColors(networkColors.light, networkColors.dark, night.current);
    networkLines.current.opacity = Math.max(spark * (0.44 + lit * 0.24), protection * (0.51 + lit * 0.22));
    networkLights.current.size = 0.22 + lit * 0.04;
    networkLights.current.opacity = Math.max(spark * 0.85, protection * 0.93);
    networkAccents.current.opacity = networkLights.current.opacity * (0.76 + 0.15 * Math.sin(time * 2.3));

    brain.current.visible = intelligence > 0.02;
    brain.current.rotation.y = Math.sin(time * 0.45) * 0.08;
    brainLines.current.color.lerpColors(networkColors.light, networkColors.dark, night.current);
    brainLines.current.opacity = intelligence * 0.65;
    brainLights.current.opacity = intelligence * 0.88;
    brainAccents.current.opacity = intelligence * (0.84 + 0.12 * Math.sin(time * 2.3));

    const dotsMaterial = nodes.current.material as THREE.PointsMaterial;
    dotsMaterial.opacity = Math.max(spark * 0.52, protection * 0.55);
    nodes.current.visible = dotsMaterial.opacity > 0.015;
    if (nodes.current.visible) {
      const position = nodes.current.geometry.attributes.position;
      for (let index = 0; index < position.count; index++) {
        const t = (index * 0.618034 + time * (0.022 + index % 4 * 0.008)) % 1;
        const strand = index % strandCount;
        strandPoint(from, strand, t, samples[0]);
        strandPoint(to, strand, t, samples[1]);
        samples[0].lerp(samples[1], blend);
        position.setXYZ(index, samples[0].x, samples[0].y, samples[0].z);
      }
      position.needsUpdate = true;
    }
    if (paintedFrames.current < 2) {
      paintedFrames.current += 1;
      if (paintedFrames.current === 1) invalidate();
      else onReady();
    }
  });

  return (
    <group ref={art}>
      <mesh ref={strands} args={[ribbonGeometry]}>
        <meshPhysicalMaterial ref={filament} vertexColors metalness={0.82} roughness={0.24}
          clearcoat={0.58} clearcoatRoughness={0.17} emissive="#ad7750" envMapIntensity={1.06} transparent />
      </mesh>
      <mesh ref={reflection} args={[ribbonGeometry]} position-y={stageFloorY * 2} scale-y={-1} visible={false}>
        <shaderMaterial vertexShader={reflectionVertex} fragmentShader={reflectionFragment} uniforms={reflectionUniforms}
          transparent depthWrite={false} />
      </mesh>
      <points ref={floorLights} frustumCulled={false} renderOrder={5}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[footings, 3]} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial map={glow} color="#ffe7b9" size={0.45} transparent depthWrite={false} toneMapped={false} />
      </points>
      <mesh ref={glass} renderOrder={6}>
        <sphereGeometry args={[1, 52, 36]} />
        <shaderMaterial ref={glassMaterial} vertexShader={glassVertex} fragmentShader={glassFragment} uniforms={glassUniforms}
          transparent depthWrite={false} />
      </mesh>
      <sprite ref={core} renderOrder={7}>
        <spriteMaterial map={flare} transparent depthWrite={false} toneMapped={false} />
      </sprite>
      <group ref={rings}>
        {[0, 1, 2].map((index) => (
          <mesh key={index} rotation={[1.1 + index * 0.3, -0.19 + index * 0.19, index * 0.16]}
            scale={[1, 0.67 + index * 0.12, 1]}>
            <torusGeometry args={[1.71 + index * 0.28, index === 0 ? 0.010 : 0.004, 6, 132]} />
            <meshBasicMaterial color={index === 0 ? "#ffddb0" : "#dfc5a1"} transparent depthWrite={false} />
            <sprite scale={index === 0 ? 0.36 : 0.21} renderOrder={7}>
              <spriteMaterial map={glow} transparent depthWrite={false} toneMapped={false} />
            </sprite>
          </mesh>
        ))}
      </group>
      {[
        { key: "network", group: network, geometry: networkGeometry, lines: networkLines, lights: networkLights, accents: networkAccents },
        { key: "brain", group: brain, geometry: brainGeometry, lines: brainLines, lights: brainLights, accents: brainAccents },
      ].map(({ key, group, geometry, lines, lights, accents }) => (
        <group key={key} ref={group}>
          <lineSegments geometry={geometry.lines} renderOrder={2}>
            <lineBasicMaterial ref={lines} color="#f0d9b9" transparent depthWrite={false} />
          </lineSegments>
          <points geometry={geometry.lights} renderOrder={4}>
            <pointsMaterial ref={lights} map={glow} color="#ffedc9" size={0.22} transparent depthWrite={false} toneMapped={false} />
          </points>
          <points geometry={geometry.accents} renderOrder={5}>
            <pointsMaterial ref={accents} map={flare} color="#fff8eb" size={0.47} transparent depthWrite={false} toneMapped={false} />
          </points>
        </group>
      ))}
      <points ref={nodes} frustumCulled={false} renderOrder={5}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dots, 3]} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial map={glow} color="#ffe4b9" size={0.13} transparent depthWrite={false} toneMapped={false} />
      </points>
      <group ref={panels} rotation={[-0.12, 0.14, 0.075]}>
        {storyPanels.map(({ x, y, z, size }, index) => (
          <group key={x} position={[x, y, z]} scale={size} rotation-y={(index - 1.5) * 0.09}>
            <mesh geometry={panelGeometry} renderOrder={10 + index * 3}>
              <meshPhysicalMaterial color={index === 3 ? "#686960" : "#77756b"} metalness={0.24}
                roughness={0.23} clearcoat={0.87} clearcoatRoughness={0.18}
                transparent depthWrite={false} userData={{ baseOpacity: index === 3 ? 0.86 : 0.66 }} />
            </mesh>
            <lineLoop geometry={panelEdges} position-z={0.038} renderOrder={11 + index * 3}>
              <lineBasicMaterial color="#fff1d6" transparent depthWrite={false} userData={{ baseOpacity: 0.93 }} />
            </lineLoop>
            <mesh position={[0, -0.585, 0.041]} renderOrder={12 + index * 3}>
              <planeGeometry args={[1.69, 0.012]} />
              <meshBasicMaterial color="#ffcf93" transparent depthWrite={false} toneMapped={false} userData={{ baseOpacity: 0.9 }} />
            </mesh>
            {[0, 1, 2, 3, 4].map((line) => (
              <mesh key={line} position={[-0.45 - (line % 2) * 0.095, 0.24 - line * 0.144, 0.044]}
                renderOrder={12 + index * 3}>
                <planeGeometry args={[0.62 - (line % 2) * 0.19, line === 0 ? 0.048 : 0.027]} />
                <meshBasicMaterial color="#f2e6d3" transparent depthWrite={false} userData={{ baseOpacity: line === 0 ? 0.96 : 0.65 }} />
              </mesh>
            ))}
            {[0, 1, 2].map((dot) => (
              <mesh key={dot} position={[-0.8 + dot * 0.096, 0.48, 0.044]} renderOrder={12 + index * 3}>
                <circleGeometry args={[0.022, 12]} />
                <meshBasicMaterial color="#ffe1b8" transparent depthWrite={false} userData={{ baseOpacity: 0.86 }} />
              </mesh>
            ))}
            <mesh position={[0.44, -0.08, 0.044]} renderOrder={12 + index * 3}>
              <planeGeometry args={[0.61, 0.54]} />
              <meshBasicMaterial color="#222924" transparent depthWrite={false} userData={{ baseOpacity: 0.37 }} />
            </mesh>
            <mesh geometry={chart} position={[0.44, -0.08, 0.046]} renderOrder={12 + index * 3}>
              <meshBasicMaterial color="#e4cfad" transparent depthWrite={false} userData={{ baseOpacity: index === 3 ? 0.74 : 0.6 }} />
            </mesh>
          </group>
        ))}
      </group>
      <group ref={shield} position={[0.83, -0.23, 1.26]}>
        <mesh geometry={shieldGeometry.body} renderOrder={8}>
          <meshPhysicalMaterial color="#5e625b" roughness={0.19} metalness={0.58}
            clearcoat={0.84} clearcoatRoughness={0.18}
            transparent depthWrite={false} userData={{ baseOpacity: 0.93 }} />
        </mesh>
        <mesh geometry={shieldGeometry.rim} renderOrder={9}>
          <meshPhysicalMaterial color="#d7bd94" metalness={0.66} roughness={0.16}
            emissive="#9c6b3c" emissiveIntensity={0.19}
            transparent depthWrite={false} userData={{ baseOpacity: 1 }} />
        </mesh>
        <mesh position={[-0.12, 0, 0.102]} rotation-z={-0.82} renderOrder={10}>
          <boxGeometry args={[0.2, 0.045, 0.026]} />
          <meshPhysicalMaterial color="#f1d3a3" metalness={0.49} roughness={0.19}
            emissive="#bd8a54" emissiveIntensity={0.3} transparent userData={{ baseOpacity: 1 }} />
        </mesh>
        <mesh position={[0.075, 0.045, 0.102]} rotation-z={0.79} renderOrder={10}>
          <boxGeometry args={[0.35, 0.045, 0.026]} />
          <meshPhysicalMaterial color="#f1d3a3" metalness={0.49} roughness={0.19}
            emissive="#bd8a54" emissiveIntensity={0.3} transparent userData={{ baseOpacity: 1 }} />
        </mesh>
      </group>
    </group>
  );
}

export default function StoryScene({ motion, visible, onReady, onFailure }: Props) {
  const compact = window.matchMedia("(max-width: 767px)").matches || navigator.hardwareConcurrency <= 4;
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, compact ? 1.15 : 1.65]}
      camera={{ position: [0.25, 0.2, 7.4], fov: 35, near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: !compact, powerPreference: "default" }}
      fallback={null}
    >
      <Studio onFailure={onFailure} />
      <Sculpture motion={motion} visible={visible} onReady={onReady} />
    </Canvas>
  );
}
