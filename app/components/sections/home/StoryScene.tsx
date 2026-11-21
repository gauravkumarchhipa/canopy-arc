"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { chapters, lastChapter } from "./story-chapters";
import type { SceneMotion } from "./StoryExperience";
import { makeShieldShape, makeStoryNetwork, makeStrands, panelTilt, stageFloorY, storyCamera, storyPanels, strandCount, strandPoint } from "./story-geometry";
import { glassFragment, glassVertex, reflectionFragment, reflectionVertex } from "./story-shaders";
import { easeBetween, sampleStory } from "./story-timeline";

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

function Studio({ motion, compact, onFailure }: Pick<Props, "motion" | "onFailure"> & { compact: boolean }) {
  const get = useThree((state) => state.get);
  const gl = useThree((state) => state.gl);
  const softbox = useRef<THREE.RectAreaLight>(null);
  const rim = useRef<THREE.DirectionalLight>(null);
  const fill = useRef<THREE.PointLight>(null);
  useEffect(() => {
    const { scene } = get();
    RectAreaLightUniformsLib.init();
    const studio = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const texture = generator.fromScene(studio, 0.02, 0.1, 50, { size: compact ? 64 : 128 });
    scene.environment = texture.texture;
    scene.environmentIntensity = 0.92;
    studio.dispose();
    generator.dispose();
    return () => {
      scene.environment = null;
      texture.dispose();
    };
  }, [compact, gl, get]);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);

  useFrame(({ scene }) => {
    const night = motion.current.darkTheme ? 1 : sampleStory(motion.current.progress).night;
    scene.environmentIntensity = 0.95 - night * 0.17;
    if (softbox.current) softbox.current.intensity = 3.8 - night * 0.85;
    if (rim.current) rim.current.intensity = 2.1 + night * 1.1;
    if (fill.current) fill.current.intensity = 3.4 + night * 2.3;
  });

  return (
    <>
      <ambientLight intensity={0.28} color="#e8e1d5" />
      <rectAreaLight ref={softbox} args={["#fff4e2", 3.8, 4.2, 2.5]} position={[-3, 4, 4]} rotation={[-0.59, -0.5, 0.12]} />
      <directionalLight ref={rim} position={[5, 2, -3]} intensity={2.1} color="#f9fcff" />
      <pointLight ref={fill} position={[-1.55, -1.35, 1.28]} color="#ffbc72" intensity={3.4} distance={5} decay={2} />
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
  const shape = makeShieldShape();
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

function makePanelDetails() {
  const text = [new THREE.PlaneGeometry(0.62, 0.048).translate(-0.45, 0.24, 0.044)];
  for (let line = 1; line < 5; line++) {
    const inset = line % 2;
    text.push(new THREE.PlaneGeometry(0.62 - inset * 0.19, 0.027)
      .translate(-0.45 - inset * 0.095, 0.24 - line * 0.144, 0.044));
  }
  const dots = Array.from({ length: 3 }, (_, dot) => new THREE.CircleGeometry(0.022, 12)
    .translate(-0.8 + dot * 0.096, 0.48, 0.044));
  const details = {
    title: text[0],
    text: mergeGeometries(text.slice(1)),
    dots: mergeGeometries(dots),
  };
  for (const geometry of [...text.slice(1), ...dots]) geometry.dispose();
  return details;
}

function StoryNetwork({ motion, glow, flare }: Pick<Props, "motion"> & { glow: THREE.Texture | null; flare: THREE.Texture | null }) {
  const lines = useRef<THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>>(null);
  const lights = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);
  const accents = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);
  const { poses, edges } = useMemo(() => makeStoryNetwork(), []);
  const positions = useMemo(() => new Float32Array(poses[0].length * 3), [poses]);
  const filaments = useMemo(() => new Float32Array(edges.length * 6), [edges]);
  const highlights = useMemo(() => new Float32Array(Math.ceil(poses[0].length / 4) * 3), [poses]);
  const sample = useRef(new THREE.Vector3());
  const elapsed = useRef(0);
  const previous = useRef(-1);

  useFrame((_, delta) => {
    if (!lines.current || !lights.current || !accents.current) return;
    const { progress, darkTheme } = motion.current;
    const { chapter, from, to, travel, blend, night } = sampleStory(progress);
    const tone = darkTheme ? 1 : night;
    const spark = 1 - easeBetween(chapter, 0.15, 0.82);
    const connection = easeBetween(chapter, 2.43, 2.94) * (1 - easeBetween(chapter, 4.22, 4.88));
    const release = easeBetween(chapter, 2.04, 2.36) * (1 - easeBetween(chapter, 2.66, 3));
    const assembly = easeBetween(chapter, 4.10, 4.43) * (1 - easeBetween(chapter, 4.63, 5));
    const nodeLight = Math.max(spark * 0.85, connection * 0.91, release * 0.87, assembly * 0.81, 0.14);
    const lineStrength = Math.max(spark, connection);

    lines.current.visible = lineStrength > 0.01;
    lines.current.material.color.lerpColors(networkColors.light, networkColors.dark, tone);
    lines.current.material.opacity = lineStrength * (0.63 + tone * 0.06);
    lights.current.material.opacity = nodeLight;
    lights.current.material.size = 0.14 + Math.max(spark, connection) * 0.085;
    elapsed.current += Math.min(delta, 0.05);
    accents.current.material.opacity = nodeLight * (0.56 + 0.12 * Math.sin(elapsed.current * 2.3));
    if (progress === previous.current) return;
    previous.current = progress;

    const point = sample.current;
    const position = lights.current.geometry.attributes.position;
    const highlight = accents.current.geometry.attributes.position;
    const filament = lines.current.geometry.attributes.position;
    for (let index = 0; index < poses[0].length; index++) {
      // Stagger packets across the four panel surfaces, then preserve their node IDs inside the shield.
      const delay = (index % 11) * 0.015;
      const amount = from === 2 ? easeBetween(travel, 0.12 + delay, 0.72 + delay) : blend;
      point.copy(poses[from][index]).lerp(poses[to][index], amount);
      if (from === 2) {
        const arc = Math.sin(amount * Math.PI);
        point.y += arc * (0.21 + (index % 4) * 0.12);
        point.z += arc * Math.sin(index * 2.399963) * 0.57;
      }
      position.setXYZ(index, point.x, point.y, point.z);
      if (index % 4 === 0) highlight.setXYZ(index / 4, point.x, point.y, point.z);
    }
    for (let index = 0; index < edges.length; index++) {
      const { a, b, spark: sparkEdge } = edges[index];
      const weight = sparkEdge ? spark : connection;
      const growth = easeBetween(weight, (index % 7) * 0.043, 0.84 + (index % 5) * 0.032);
      const x = position.getX(a);
      const y = position.getY(a);
      const z = position.getZ(a);
      filament.setXYZ(index * 2, x, y, z);
      filament.setXYZ(index * 2 + 1,
        THREE.MathUtils.lerp(x, position.getX(b), growth),
        THREE.MathUtils.lerp(y, position.getY(b), growth),
        THREE.MathUtils.lerp(z, position.getZ(b), growth));
    }
    filament.needsUpdate = position.needsUpdate = highlight.needsUpdate = true;
  });

  return (
    <group>
      <lineSegments ref={lines} renderOrder={2} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[filaments, 3]} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <lineBasicMaterial transparent depthWrite={false} />
      </lineSegments>
      <points ref={lights} renderOrder={4} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial map={glow} color="#ffedc9" transparent depthWrite={false} toneMapped={false} />
      </points>
      <points ref={accents} renderOrder={5} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[highlights, 3]} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial map={flare} color="#fff8eb" size={0.41} transparent depthWrite={false} toneMapped={false} />
      </points>
    </group>
  );
}

function Sculpture({ motion, visible, onReady, compact }: Omit<Props, "onFailure"> & { compact: boolean }) {
  const { invalidate, camera, size, performance, setDpr } = useThree();
  const resolution = useThree((state) => state.performance.current);
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
  const shield = useRef<THREE.Group>(null);
  const core = useRef<THREE.Sprite>(null);
  const orbit = useRef(0);
  const parallax = useRef(new THREE.Vector2());
  const entrance = useRef(0);
  const elapsed = useRef(0);
  const paintedFrames = useRef(0);
  const samples = useMemo(() => [new THREE.Vector3(), new THREE.Vector3()], []);
  const ribbonGeometry = useMemo(() => makeStrands(compact), [compact]);
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
  const panelDetails = useMemo(() => makePanelDetails(), []);
  const dots = useMemo(() => new Float32Array((compact ? 30 : 78) * 3), [compact]);
  const footings = useMemo(() => new Float32Array(16 * 3), []);
  const glassUniforms = useMemo(() => ({
    strength: { value: 1 },
    night: { value: 0 },
    coverage: { value: 1 },
    ior: { value: 1.46 },
    thickness: { value: 0.085 },
  }), []);
  const reflectionUniforms = useMemo(() => ({
    strength: { value: 0 },
    floorY: { value: stageFloorY },
  }), []);

  useEffect(() => () => {
    const resources = [ribbonGeometry, shieldGeometry.body, shieldGeometry.rim, glow, flare,
      panelGeometry, panelEdges, chart, ...Object.values(panelDetails)];
    for (const resource of resources) {
      resource?.dispose();
    }
  }, [ribbonGeometry, shieldGeometry, glow, flare, panelGeometry, panelEdges, chart, panelDetails]);

  useEffect(() => {
    const cap = compact || size.width < 580 ? 1.15 : 1.65;
    setDpr(Math.min(window.devicePixelRatio, cap) * resolution);
  }, [compact, resolution, setDpr, size.width]);

  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    let last = 0;
    let previousTime = 0;
    let previousProgress = -1;
    let slowFrames = 0;
    const loop = (time: number) => {
      const moving = motion.current.progress !== previousProgress || Math.abs(motion.current.orbit - orbit.current) > 0.01;
      if (previousTime && time - previousTime > 24 && moving) slowFrames++;
      else slowFrames = Math.max(0, slowFrames - 1);
      if (slowFrames >= 4) {
        performance.regress();
        slowFrames = 0;
      }
      previousTime = time;
      if (time - last >= (moving && !compact ? 14 : 30)) {
        last = time;
        previousProgress = motion.current.progress;
        invalidate();
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [compact, invalidate, motion, performance, visible]);

  useFrame((_, delta) => {
    if (!art.current || !strands.current || !filament.current || !reflection.current || !glass.current || !glassMaterial.current ||
      !rings.current || !panels.current || !nodes.current || !floorLights.current ||
      !shield.current || !core.current) return;

    const dt = Math.min(delta, 0.05);
    elapsed.current += dt;
    entrance.current = Math.min(1, entrance.current + dt * 0.72);
    const time = elapsed.current;
    const state = motion.current;
    const { chapter, from, to, blend, night: chapterNight } = sampleStory(state.progress);
    const night = state.darkTheme ? 1 : chapterNight;
    const influences = strands.current.morphTargetInfluences!;
    const reflectionInfluences = reflection.current.morphTargetInfluences!;
    const intermediate = from === 0 ? chapters.length : from === 4 ? chapters.length + 1 : -1;
    const firstHalf = blend < 0.5;
    const ribbonFrom = intermediate < 0 || firstHalf ? from : intermediate;
    const ribbonTo = intermediate < 0 || !firstHalf ? to : intermediate;
    const ribbonBlend = intermediate < 0 ? blend : easeBetween(blend, firstHalf ? 0 : 0.5, firstHalf ? 0.5 : 1);
    for (let index = 1; index <= influences.length; index++) {
      const weight = index === ribbonFrom ? 1 - ribbonBlend : index === ribbonTo ? ribbonBlend : 0;
      influences[index - 1] = reflectionInfluences[index - 1] = weight;
    }

    const spark = 1 - easeBetween(chapter, 0.13, 0.76);
    const engineering = easeBetween(chapter, 1.48, 1.93) * (1 - easeBetween(chapter, 2.11, 2.79));
    const intelligence = 1 - easeBetween(Math.abs(chapter - 3), 0.12, 0.85);
    const protection = easeBetween(chapter, 3.32, 3.97) * (1 - easeBetween(chapter, 4.12, 4.81));
    const structure = influences[0];
    const outcome = influences[lastChapter - 1];

    orbit.current = THREE.MathUtils.damp(orbit.current, state.orbit, 8, dt);
    const parallaxX = parallax.current.x = THREE.MathUtils.damp(parallax.current.x, state.pointerX, 3.8, dt);
    const parallaxY = parallax.current.y = THREE.MathUtils.damp(parallax.current.y, state.pointerY, 3.8, dt);
    const lit = 1 - night;
    const intro = 1 - THREE.MathUtils.smoothstep(entrance.current, 0, 1);
    const arc = Math.sin(blend * Math.PI) ** 2;
    const azimuth = orbit.current + THREE.MathUtils.lerp(cameraTracks[from], cameraTracks[to], blend)
      + arc * (from % 2 === 0 ? 0.13 : -0.12) + 0.12 * intro * spark + parallaxX * 0.11;
    const framing = Math.max(1, 1.37 / (size.width / Math.max(1, size.height)));
    const distance = (THREE.MathUtils.lerp(cameraDistances[from], cameraDistances[to], blend)
      + intro * 0.32 * spark + arc * 0.23) * framing;
    const elevation = THREE.MathUtils.lerp(elevations[from], elevations[to], blend) + intro * 0.13 * spark
      + arc * 0.24 - parallaxY * 0.19;
    camera.position.set(Math.sin(azimuth) * distance, elevation, Math.cos(azimuth) * distance);
    const sideClearance = size.width > 560 ? outcome * 0.33 : 0;
    camera.lookAt(-Math.cos(azimuth) * sideClearance, -0.05 + (structure + outcome) * 0.19 - engineering * 0.055,
      Math.sin(azimuth) * sideClearance);
    art.current.position.y = Math.sin(time * 0.72) * (0.045 * spark + 0.018) * (1 - Math.max(structure, outcome));
    filament.current.roughness = THREE.MathUtils.lerp(0.28, 0.19, night) + arc * 0.024;
    filament.current.color.setScalar(1 - lit * 0.12);
    filament.current.emissiveIntensity = 0.015 + night * 0.066;
    filament.current.opacity = 1 - Math.max(engineering * 0.40, spark * 0.29, protection * 0.54, intelligence * 0.63);
    reflection.current.visible = structure + outcome > 0.025;
    reflection.current.material.uniforms.strength.value = structure * 0.24 + outcome * 0.41;
    floorLights.current.visible = reflection.current.visible;
    floorLights.current.material.opacity = structure * 0.32 + outcome * 0.62;
    if (floorLights.current.visible) {
      const position = floorLights.current.geometry.attributes.position;
      for (let index = 0; index < position.count; index++) {
        const strand = Math.floor(index / 2) * 3 + 1;
        const end = index % 2;
        strandPoint(ribbonFrom, strand, end, samples[0]);
        strandPoint(ribbonTo, strand, end, samples[1]);
        samples[0].lerp(samples[1], ribbonBlend);
        position.setXYZ(index, samples[0].x, samples[0].y + 0.014, samples[0].z);
      }
      position.needsUpdate = true;
    }

    const shell = Math.max(spark * 0.94, protection);
    glass.current.visible = shell > 0.01;
    glass.current.scale.setScalar(1.24 + protection * 0.32);
    glassMaterial.current.uniforms.strength.value = shell;
    glassMaterial.current.uniforms.night.value = night;
    glassMaterial.current.uniforms.coverage.value = spark > 0 ? spark : protection;
    rings.current.visible = shell + intelligence > 0.03;
    rings.current.rotation.y = Math.sin(time * 0.24) * 0.16;
    rings.current.children.forEach((ring, index) => {
      const mesh = ring as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
      const accent = index === 0 ? 0 : 1;
      mesh.material.color.lerpColors(orbitColors.light[accent], orbitColors.dark[accent], night);
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
    core.current.material.opacity = spark * 0.91;

    panels.current.children.forEach((panel, index) => {
      const delay = (3 - index) * 0.042;
      const built = easeBetween(chapter, 1.58 + delay, 1.9 + delay);
      const release = easeBetween(chapter, 2.12 + delay, 2.57 + delay);
      const strength = built * (1 - release);
      panel.visible = strength > 0.01;
      panel.scale.set(storyPanels[index].size, storyPanels[index].size * (0.035 + 0.965 * built),
        storyPanels[index].size * (1 - 0.67 * release));
      panel.children.forEach((object) => {
        const material = (object as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material;
        material.opacity = strength * (material.userData.baseOpacity as number);
      });
    });

    const badge = easeBetween(chapter, 3.56, 3.98) * (1 - easeBetween(chapter, 4.14, 4.66));
    shield.current.visible = badge > 0.01;
    shield.current.position.set(0.83 * badge, -0.23 + (1 - badge) * 0.19, 0.62 + badge * 0.64);
    shield.current.scale.set(0.34 + badge * 0.76, 0.56 + badge * 0.54, 0.46 + badge * 0.64);
    shield.current.rotation.y = -0.34 + (1 - badge) * 0.9;
    shield.current.children.forEach((object) => {
      const material = (object as THREE.Mesh<THREE.BufferGeometry, THREE.Material>).material;
      material.opacity = badge * (material.userData.baseOpacity as number);
    });

    const dotsMaterial = nodes.current.material as THREE.PointsMaterial;
    dotsMaterial.opacity = Math.max(spark * 0.45, protection * 0.48, arc * 0.74, structure * 0.14, outcome * 0.17);
    nodes.current.visible = dotsMaterial.opacity > 0.015;
    if (nodes.current.visible) {
      const position = nodes.current.geometry.attributes.position;
      for (let index = 0; index < position.count; index++) {
        const base = 0.5 - 0.5 * Math.cos(index * 3.88322 + time * (0.14 + index % 4 * 0.055));
        const t = THREE.MathUtils.lerp(base, index % 2, arc * 0.61);
        const strand = index % strandCount;
        strandPoint(ribbonFrom, strand, t, samples[0]);
        strandPoint(ribbonTo, strand, t, samples[1]);
        samples[0].lerp(samples[1], ribbonBlend);
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
          clearcoat={0.58} clearcoatRoughness={0.17} emissive="#ad7750" envMapIntensity={1.06} transparent depthWrite={false} />
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
        <sphereGeometry args={[1, compact ? 34 : 54, compact ? 24 : 36]} />
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
      <StoryNetwork motion={motion} glow={glow} flare={flare} />
      <points ref={nodes} frustumCulled={false} renderOrder={5}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dots, 3]} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <pointsMaterial map={glow} color="#ffe4b9" size={0.13} transparent depthWrite={false} toneMapped={false} />
      </points>
      <group ref={panels} rotation={panelTilt}>
        {storyPanels.map(({ x, y, z, size }, index) => (
          <group key={x} position={[x, y, z]} scale={size} rotation-y={(index - 1.5) * 0.09}>
            <mesh geometry={panelGeometry} renderOrder={10 + index * 3}>
              <meshPhysicalMaterial color={index === 3 ? "#686960" : "#77756b"} metalness={0.21}
                roughness={0.23} ior={1.46} thickness={0.075} transmission={compact ? 0 : 0.12}
                clearcoat={0.87} clearcoatRoughness={0.18}
                transparent depthWrite={false} userData={{ baseOpacity: index === 3 ? 0.86 : 0.66 }} />
            </mesh>
            <lineLoop geometry={panelEdges} position-z={0.038} renderOrder={11 + index * 3}>
              <lineBasicMaterial color="#fff1d6" transparent depthWrite={false} userData={{ baseOpacity: 0.93 }} />
            </lineLoop>
            <mesh position={[0, -0.585, 0.041]} renderOrder={12 + index * 3}>
              <planeGeometry args={[1.69, 0.012]} />
              <meshBasicMaterial color="#ffcf93" transparent depthWrite={false} toneMapped={false} userData={{ baseOpacity: 0.9 }} />
            </mesh>
            <mesh geometry={panelDetails.title} renderOrder={12 + index * 3}>
              <meshBasicMaterial color="#f2e6d3" transparent depthWrite={false} userData={{ baseOpacity: 0.96 }} />
            </mesh>
            <mesh geometry={panelDetails.text} renderOrder={12 + index * 3}>
              <meshBasicMaterial color="#f2e6d3" transparent depthWrite={false} userData={{ baseOpacity: 0.65 }} />
            </mesh>
            <mesh geometry={panelDetails.dots} renderOrder={12 + index * 3}>
              <meshBasicMaterial color="#ffe1b8" transparent depthWrite={false} userData={{ baseOpacity: 0.86 }} />
            </mesh>
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
          <meshPhysicalMaterial color="#5e625b" roughness={0.22} metalness={0.40}
            ior={1.49} thickness={0.092} transmission={compact ? 0 : 0.14}
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
      performance={{ min: 0.75, debounce: 400 }}
      camera={{ position: [0.25, 0.2, 7.4], fov: 35, near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: !compact, powerPreference: "default", transmissionResolutionScale: 0.5 }}
      fallback={null}
    >
      <Studio motion={motion} compact={compact} onFailure={onFailure} />
      <Sculpture motion={motion} visible={visible} onReady={onReady} compact={compact} />
    </Canvas>
  );
}
