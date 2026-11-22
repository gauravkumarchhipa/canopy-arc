"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { studioFinishes } from "../../three/studio-finishes";
import type { SceneMotion } from "./StoryExperience";
import { makeStrands } from "./story-geometry";
import { storyCamera } from "./story-ribbon";
import { sampleStory } from "./story-timeline";
import StoryDetails from "./StoryDetails";

type Props = {
  motion: RefObject<SceneMotion>;
  setRenderRequest: (request: (() => void) | null) => void;
  visible: boolean;
  compact: boolean;
  onReady: () => void;
  onFailure: () => void;
};

const neutralMetal = new THREE.Color("#ffffff");
const networkMetal = {
  light: new THREE.Color("#92938d"),
  dark: new THREE.Color("#f5eee0"),
};
const networkGlass = {
  light: new THREE.Color("#7e9799"),
  dark: new THREE.Color("#d0e7e7"),
};
const glassColor = new THREE.Color("#d6e1e1");
const compactGlassColor = new THREE.Color("#a9b5b8");
const protectionMetal = new THREE.Color("#cf9c64");
const markMetal = new THREE.Color(studioFinishes.light.metal);

function makeContactShadow() {
  const size = 64;
  const pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const radius = Math.hypot(x / (size - 1) * 2 - 1, y / (size - 1) * 2 - 1);
      const index = (y * size + x) * 4;
      pixels.fill(255, index, index + 3);
      pixels[index + 3] = Math.round(255 * Math.max(0, 1 - radius) ** 2);
    }
  }
  const texture = new THREE.DataTexture(pixels, size, size);
  texture.magFilter = texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function Studio({ motion, setRenderRequest, visible, compact, onReady, onFailure }: Props) {
  const { get, gl, invalidate, setDpr } = useThree();
  const metal = useRef<THREE.Mesh>(null);
  const metalFinish = useRef<THREE.MeshPhysicalMaterial>(null);
  const glass = useRef<THREE.Mesh>(null);
  const glassFinish = useRef<THREE.MeshPhysicalMaterial>(null);
  const reflection = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);
  const shadow = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
  const footing = useRef<THREE.Group>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const ready = useRef(false);
  const previousProgress = useRef(-1);
  const wasMoving = useRef(false);
  const slowFrames = useRef(0);
  const quality = useRef(1);
  const openingTime = useRef(0);
  const interaction = useRef({ orbit: 0, x: 0, y: 0 });
  const target = useMemo(() => new THREE.Vector3(), []);
  const reflectionFloor = useRef(new THREE.Uniform(0));
  const fadeReflection = useCallback<THREE.MeshBasicMaterial["onBeforeCompile"]>((shader) => {
    shader.uniforms.storyFloor = reflectionFloor.current;
    shader.vertexShader = `varying float storyOriginalHeight;\n${shader.vertexShader}`.replace(
      "#include <project_vertex>", "storyOriginalHeight = transformed.y;\n#include <project_vertex>",
    );
    shader.fragmentShader = `uniform float storyFloor;\nvarying float storyOriginalHeight;\n${shader.fragmentShader}`.replace(
      "#include <opaque_fragment>", `diffuseColor.a *= (1.0 - smoothstep(0.02, 0.96, storyOriginalHeight - storyFloor))
        * smoothstep(-0.06, 0.03, storyOriginalHeight - storyFloor);\n#include <opaque_fragment>`,
    );
  }, []);
  const metalGeometry = useMemo(() => makeStrands(compact, false), [compact]);
  const glassGeometry = useMemo(() => makeStrands(compact, true), [compact]);
  const contactShadow = useMemo(() => makeContactShadow(), []);
  const footMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    map: contactShadow, color: "#3c3229", transparent: true, depthWrite: false, toneMapped: false,
  }), [contactShadow]);
  const nativeDpr = Math.min(typeof window === "undefined" ? 1 : window.devicePixelRatio, compact ? 1.15 : 1.5);

  useEffect(() => {
    const { scene } = get();
    const studio = new THREE.Scene();
    studio.background = new THREE.Color("#51504c");
    const panels: { position: [number, number, number]; panelSize: [number, number]; intensity: number; color: string }[] = [
      { position: [-3, 5, 3], panelSize: [5.5, 2.6], intensity: 4.0, color: "#fff6e8" },
      { position: [4, 0.5, 2], panelSize: [1.25, 4.8], intensity: 2.4, color: "#f3f7ff" },
      { position: [1.5, 3.4, -4], panelSize: [6.4, 1.3], intensity: 3.1, color: "#ffffff" },
      { position: [0, -3, 1], panelSize: [7, 4], intensity: 0.28, color: "#aaa297" },
    ];
    for (const { position, panelSize, intensity, color } of panels) {
      const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(...panelSize),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) }),
      );
      panel.position.set(...position);
      panel.lookAt(0, 0, 0);
      studio.add(panel);
    }
    const generator = new THREE.PMREMGenerator(gl);
    const environment = generator.fromScene(studio, 0, 0.1, 30, { size: compact ? 64 : 128 });
    scene.environment = environment.texture;
    invalidate();
    for (const child of studio.children as THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[]) {
      child.geometry.dispose();
      child.material.dispose();
    }
    generator.dispose();
    return () => {
      scene.environment = null;
      environment.dispose();
    };
  }, [compact, get, gl, invalidate]);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);

  useEffect(() => () => {
    metalGeometry.dispose();
    glassGeometry.dispose();
  }, [metalGeometry, glassGeometry]);

  useEffect(() => () => {
    contactShadow.dispose();
    footMaterial.dispose();
  }, [contactShadow, footMaterial]);

  useEffect(() => {
    setDpr(nativeDpr * quality.current);
  }, [nativeDpr, setDpr]);

  useEffect(() => {
    if (!visible) return;
    const request = () => {
      if (!document.hidden) invalidate();
    };
    setRenderRequest(request);
    document.addEventListener("visibilitychange", request);
    request();
    return () => {
      setRenderRequest(null);
      document.removeEventListener("visibilitychange", request);
    };
  }, [invalidate, setRenderRequest, visible]);

  useFrame(({ camera, scene, size }, delta) => {
    if (!metal.current || !glass.current || !shadow.current) return;
    const state = motion.current;
    const { from, to, blend } = sampleStory(state.progress);
    const a = storyCamera[from];
    const b = storyCamera[to];
    const mix = (start: number, end: number) => THREE.MathUtils.lerp(start, end, blend);
    const progressChanged = state.progress !== previousProgress.current;
    if (progressChanged && wasMoving.current && delta > 0.026) slowFrames.current++;
    else slowFrames.current = Math.max(slowFrames.current - 1, 0);
    if (slowFrames.current >= 4 && quality.current > 0.58) {
      slowFrames.current = 0;
      quality.current = Math.max(0.58, quality.current - (delta > 0.065 ? 0.28 : 0.16));
      setDpr(nativeDpr * quality.current);
      if (quality.current <= 0.72) {
        // Preserve the ribbon surfaces while removing the costliest material passes.
        if (metalFinish.current) {
          metalFinish.current.anisotropy = 0;
          metalFinish.current.clearcoat = 0;
        }
        if (glassFinish.current) {
          glassFinish.current.transmission = 0;
          glassFinish.current.metalness = 0.32;
        }
      }
    }
    wasMoving.current = progressChanged;
    previousProgress.current = state.progress;

    for (const mesh of [metal.current, glass.current, reflection.current]) {
      const influences = mesh?.morphTargetInfluences;
      if (!influences) continue;
      for (let index = 0; index < influences.length; index++) {
        influences[index] = index + 1 === from ? 1 - blend : index + 1 === to ? blend : 0;
      }
    }

    const view = interaction.current;
    const dt = Math.min(delta, 0.05);
    const opening = from === 0 ? 1 - blend : 0;
    if (opening > 0.01 && visible && !document.hidden) openingTime.current += dt;
    const drift = Math.sin(openingTime.current * 0.88) * opening;
    const float = Math.sin(openingTime.current * 1.18) * opening * 0.095;
    const orbitTarget = state.orbit;
    view.orbit = THREE.MathUtils.damp(view.orbit, orbitTarget, 9, dt);
    view.x = THREE.MathUtils.damp(view.x, state.pointerX, 7, dt);
    view.y = THREE.MathUtils.damp(view.y, state.pointerY, 7, dt);
    const bow = Math.sin(blend * Math.PI) ** 2;
    const azimuth = mix(a.azimuth, b.azimuth) + drift * 0.21 + bow * 0.13 + view.orbit + view.x * 0.10;
    const aspect = size.width / Math.max(size.height, 1);
    const distance = (mix(a.distance, b.distance) + bow * 0.46) * Math.max(1, 1.32 / aspect);
    const lift = mix(a.lift, b.lift) - float;
    const slide = mix(a.slide, b.slide) * (compact ? 0.5 : 1);
    const elevation = mix(a.elevation, b.elevation) + bow * 0.06 - view.y * 0.045;
    target.set(-Math.cos(azimuth) * slide, lift, Math.sin(azimuth) * slide);
    camera.position.set(Math.sin(azimuth) * distance + target.x, lift + distance * elevation,
      Math.cos(azimuth) * distance + target.z);
    camera.lookAt(target);

    shadow.current.position.y = mix(a.floor, b.floor);
    shadow.current.scale.set(mix(from === 0 ? 5 : 7, 7), mix(from === 0 ? 2.7 : 4, 4), 1);
    const darkness = Number(state.darkTheme);
    const network = mix(Number(from === 3 || from === 4), Number(to === 3 || to === 4));
    const protection = mix(Number(from === 4), Number(to === 4));
    const engineering = mix(Number(from === 2), Number(to === 2));
    const theme = state.darkTheme ? "dark" : "light";
    if (metalFinish.current) {
      metalFinish.current.color.copy(neutralMetal).lerp(networkMetal[theme], network);
      metalFinish.current.color.lerp(protectionMetal, protection * 0.72);
      metalFinish.current.color.lerp(markMetal, opening);
      metalFinish.current.emissiveIntensity = network * darkness * 0.22 + engineering * 0.33 + opening * darkness * 0.25;
    }
    if (glassFinish.current) {
      glassFinish.current.color.copy(compact ? compactGlassColor : glassColor).lerp(networkGlass[theme], network);
      glassFinish.current.color.lerp(protectionMetal, protection * 0.47);
      glassFinish.current.emissiveIntensity = network * darkness * 0.24 + engineering * 0.19;
    }
    const groundedFrom = from === 1 || from === 5 ? 1 : 0;
    const groundedTo = to === 1 || to === 5 ? 1 : 0;
    const grounded = mix(groundedFrom, groundedTo);
    if (reflection.current) {
      reflection.current.visible = grounded > 0.08 && quality.current > 0.72;
      reflectionFloor.current.value = shadow.current.position.y;
      reflection.current.position.y = shadow.current.position.y * 2;
      reflection.current.material.opacity = grounded * 0.34;
    }
    shadow.current.material.opacity = 0.29 + darkness * 0.14 - bow * 0.08;
    if (footing.current) {
      footing.current.visible = grounded > 0.01;
      footing.current.position.y = shadow.current.position.y + 0.025;
      footMaterial.setValues({ opacity: grounded ** 2 * (0.39 + darkness * 0.12) });
    }
    scene.environmentIntensity = 0.98 + darkness * 0.32;
    if (key.current) key.current.intensity = 1.6 + darkness * 0.48;

    if (!ready.current && scene.environment) {
      ready.current = true;
      onReady();
    }
    const settling = Math.abs(view.orbit - orbitTarget) + Math.abs(view.x - state.pointerX) + Math.abs(view.y - state.pointerY);
    if (visible && !document.hidden && (opening > 0.01 || settling > 0.002)) invalidate();
  });

  return (
    <>
      <hemisphereLight args={["#fff9ed", "#706d69", 0.8]} />
      <directionalLight ref={key} color="#fff7ea" position={[-4, 6, 4]} />
      <mesh ref={metal} args={[metalGeometry]}>
        <meshPhysicalMaterial ref={metalFinish} vertexColors metalness={compact ? 0.82 : 0.91} roughness={compact ? 0.39 : 0.31}
          emissive="#d9cebb" emissiveIntensity={0}
          anisotropy={compact ? 0 : 0.69} anisotropyRotation={Math.PI / 2} clearcoat={0.21}
          clearcoatRoughness={0.38} />
      </mesh>
      <mesh ref={glass} args={[glassGeometry]}>
        <meshPhysicalMaterial ref={glassFinish} emissive="#b9d0d0" emissiveIntensity={0} roughness={compact ? 0.25 : 0.16}
          metalness={compact ? 0.32 : 0} transmission={compact ? 0 : 0.94} thickness={0.065}
          ior={1.47} attenuationColor="#b0c7c7" attenuationDistance={0.55} clearcoat={0.66} />
      </mesh>
      <StoryDetails motion={motion} />
      {!compact && (
        <mesh ref={reflection} args={[metalGeometry]} scale={[1, -1, 1]} visible={false}>
          <meshBasicMaterial color="#c8c9bd" transparent depthWrite={false} onBeforeCompile={fadeReflection} />
        </mesh>
      )}
      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={contactShadow} color="#3c3229" transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <group ref={footing}>
        <mesh position={[-2.54, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} material={footMaterial}>
          <planeGeometry args={[4.7, 1.45]} />
        </mesh>
        <mesh position={[2.54, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} material={footMaterial}>
          <planeGeometry args={[4.7, 1.45]} />
        </mesh>
      </group>
    </>
  );
}

export default function StoryScene(props: Props) {
  return (
    <Canvas
      camera={{ fov: 35, near: 0.1, far: 65, position: [0, 2, 10] }}
      dpr={1}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: props.compact ? "low-power" : "default" }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.06;
        gl.transmissionResolutionScale = 0.6;
      }}
    >
      <Studio {...props} />
    </Canvas>
  );
}
