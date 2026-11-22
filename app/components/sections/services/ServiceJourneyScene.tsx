"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { ModelPose } from "../../three/useModelOrbit";

type Props = { dark: boolean; pose: ModelPose; dragging: boolean; onReady: () => void; onFailure: () => void };

const stages = [
  { title: "Ideate", caption: "Define & plan", icon: "M9 18h6m-5 3h4m-4-6c0-2-4-3-4-7a6 6 0 0 1 12 0c0 4-4 5-4 7" },
  { title: "Design", caption: "Create experiences", icon: "m2 8 10-5 10 5-10 5-10-5Zm0 5 10 5 10-5M2 18l10 5 10-5" },
  { title: "Build", caption: "Develop & integrate", icon: "m7 6-5 6 5 6m10-12 5 6-5 6M14 4l-4 16" },
  { title: "Intelligence", caption: "Add AI & data", icon: "M12 6c0-4-6-4-6 0-4 0-5 5-2 7-2 3 0 6 3 6 0 4 5 4 5 0V6Zm0 0c0-4 6-4 6 0 4 0 5 5 2 7 2 3 0 6-3 6 0 4-5 4-5 0M6 6c0 2 1 3 3 3m-5 4h4m10-7c0 2-1 3-3 3m5 4h-4" },
  { title: "Secure", caption: "Protect & scale", icon: "M12 2 3 6v6c0 5 4 8 9 10 5-2 9-5 9-10V6l-9-4Zm-4 10 3 3 5-5" },
  { title: "Launch", caption: "Deliver impact", icon: "M8 16c0-7 6-12 13-13 0 7-6 13-13 13Zm0-7-4 2-2 4 6-1m7 1-2 5-4 2 1-6m5-7h.01M6 18l-4 4" },
] as const;

const panelWidth = 1.29;
const panelHeight = 1.46;

const journeyPalettes = {
  light: {
    ink: "#171410",
    caption: "#29241e",
    glass: "#aba08f",
    glassOpacity: 0.64,
    rim: "#746858",
    ribbon: "#92938d",
    bronze: "#a97a4d",
    ribbonLight: 0.035,
    bronzeLight: 0.10,
    glow: 0.48,
  },
  dark: {
    ink: "#fffdf8",
    caption: "#f9f3e8",
    glass: "#302d28",
    glassOpacity: 0.86,
    rim: "#ded3bf",
    ribbon: "#d0c7b8",
    bronze: "#cf9c64",
    ribbonLight: 0.19,
    bronzeLight: 0.25,
    glow: 0.62,
  },
} as const;

function makePanelRim() {
  const x = panelWidth / 2 - 0.01;
  const y = panelHeight / 2 - 0.01;
  const corner = 0.057;
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
}

function makeLabel(stage: (typeof stages)[number], ink: string, caption: string, anisotropy: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 736;
  const context = canvas.getContext("2d")!;
  context.scale(2, 2);
  context.strokeStyle = context.fillStyle = ink;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.save();
  context.translate(121, 51);
  context.scale(3.25, 3.25);
  context.lineWidth = 1.36;
  context.stroke(new Path2D(stage.icon));
  context.restore();
  context.textAlign = "center";
  context.font = "700 40px system-ui, sans-serif";
  context.fillText(stage.title, 160, 203, 290);
  context.fillStyle = caption;
  context.font = "600 28px system-ui, sans-serif";
  context.fillText(stage.caption, 160, 255, 290);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  return texture;
}

function makeGlow() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 96;
  const context = canvas.getContext("2d")!;
  const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, "#fffbed");
  gradient.addColorStop(0.24, "rgba(255, 224, 175, .68)");
  gradient.addColorStop(1, "rgba(255, 195, 114, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function ribbonPoint(t: number, spread: number) {
  const hill = Math.exp(-(((t - 0.79) / 0.205) ** 2));
  return new THREE.Vector3(
    (t - 0.5) * 12.8,
    -1.36 + hill * 1.93 + Math.sin(t * Math.PI * 4.2) * 0.19
      + spread * (0.31 + Math.sin(t * Math.PI * 2) * 0.48),
    -1.25 + spread * 1.9 + (t - 0.36) * 0.32,
  );
}

function Journey({ dark, pose, dragging, onReady, onFailure }: Props) {
  const renderer = useThree((state) => state.gl);
  const get = useThree((state) => state.get);
  const invalidate = useThree((state) => state.invalidate);
  const rig = useRef<THREE.Group>(null);
  const announced = useRef(false);
  const palette = dark ? journeyPalettes.dark : journeyPalettes.light;
  const labels = useMemo(() => {
    const anisotropy = Math.max(1, Math.min(4, renderer.capabilities.getMaxAnisotropy()));
    return stages.map((stage) => makeLabel(stage, palette.ink, palette.caption, anisotropy));
  }, [palette.ink, palette.caption, renderer]);
  const glow = useMemo(() => makeGlow(), []);
  const panel = useMemo(() => new RoundedBoxGeometry(panelWidth, panelHeight, 0.11, 4, 0.055), []);
  const rim = useMemo(() => makePanelRim(), []);
  const ribbons = useMemo(() => Array.from({ length: 23 }, (_, index) => {
    const spread = index / 22 - 0.5;
    const points = Array.from({ length: 41 }, (_, step) => ribbonPoint(step / 40, spread));
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 82, index % 5 === 0 ? 0.014 : 0.009, 5, false);
  }), []);

  useEffect(() => () => labels.forEach((label) => label.dispose()), [labels]);
  useEffect(() => () => {
    glow.dispose();
    panel.dispose();
    rim.dispose();
    ribbons.forEach((ribbon) => ribbon.dispose());
  }, [glow, panel, rim, ribbons]);

  useEffect(() => {
    const { scene } = get();
    const studio = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(renderer);
    const environment = generator.fromScene(studio, 0.015, 0.1, 25, { size: 64 });
    scene.environment = environment.texture;
    studio.dispose();
    generator.dispose();
    return () => {
      scene.environment = null;
      environment.dispose();
    };
  }, [get, renderer]);

  useEffect(() => {
    const canvas = renderer.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [renderer, onFailure]);

  useEffect(() => { invalidate(); }, [dark, dragging, invalidate, pose]);

  useFrame(({ camera, size }, delta) => {
    if (!rig.current) return;
    const view = camera as THREE.OrthographicCamera;
    const zoom = Math.min(size.width / 9.85, size.height / 3.78);
    if (view.zoom !== zoom) {
      view.zoom = zoom;
      view.updateProjectionMatrix();
    }
    view.lookAt(0, 0.22, 0);
    const { yaw, pitch } = pose;
    const immediate = dragging || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = Math.max(1 / 60, Math.min(0.05, delta));
    rig.current.rotation.y = immediate ? yaw : THREE.MathUtils.damp(rig.current.rotation.y, yaw, 10, step);
    rig.current.rotation.x = immediate ? pitch : THREE.MathUtils.damp(rig.current.rotation.x, pitch, 10, step);
    if (Math.abs(rig.current.rotation.y - yaw) + Math.abs(rig.current.rotation.x - pitch) > 0.001) invalidate();
    if (!announced.current) {
      announced.current = true;
      onReady();
    }
  });

  return (
    <>
      <ambientLight intensity={0.48} color="#efe7dc" />
      <directionalLight position={[-2, 5, 4]} intensity={2.4} color="#fff7eb" />
      <directionalLight position={[3, 2, -5]} intensity={3} color="#f4f7ff" />
      <pointLight position={[3.1, 0.1, 2]} intensity={9} distance={8} decay={2} color="#ffd7a1" />
      <group ref={rig} rotation={[-0.06, -0.11, 0, "YXZ"]}>
        {ribbons.map((geometry, index) => {
          const accent = index % 5 === 0;
          return (
            <mesh key={geometry.uuid} geometry={geometry}>
              <meshPhysicalMaterial color={accent ? palette.bronze : palette.ribbon} metalness={0.74}
                roughness={0.36} clearcoat={0.35} envMapIntensity={0.68}
                emissive={accent ? "#c39463" : "#d9cebb"} emissiveIntensity={accent ? palette.bronzeLight : palette.ribbonLight} />
            </mesh>
          );
        })}
        {labels.map((label, index) => {
          const x = (index - 2.5) * 1.49;
          const y = -0.56 + index * 0.35;
          return (
            <group key={stages[index].title} position={[x, y, 0.28]} rotation={[-0.02, -0.34, 0.11]}>
              <mesh geometry={panel} renderOrder={2}>
                <meshPhysicalMaterial color={palette.glass} metalness={0.24} roughness={0.29}
                  clearcoat={0.70} clearcoatRoughness={0.18} envMapIntensity={0.55}
                  opacity={palette.glassOpacity} transparent depthWrite={false} />
              </mesh>
              <lineLoop geometry={rim} position-z={0.057} renderOrder={3}>
                <lineBasicMaterial color={palette.rim} transparent toneMapped={false} depthWrite={false} opacity={0.76} />
              </lineLoop>
              {[0, Math.PI].map((rotation) => (
                <group key={rotation} rotation-y={rotation}>
                  <mesh position-z={0.063} renderOrder={3}>
                    <planeGeometry args={[panelWidth - 0.025, panelHeight - 0.025]} />
                    <meshBasicMaterial map={label} transparent toneMapped={false} depthWrite={false} />
                  </mesh>
                </group>
              ))}
              <sprite position={[0.42, -0.72, 0.06]} scale={[0.75, 0.29, 1]} renderOrder={4}>
                <spriteMaterial map={glow} transparent depthWrite={false} toneMapped={false} opacity={palette.glow} />
              </sprite>
              <sprite position={[-0.54, 0.69, 0.06]} scale={[0.35, 0.18, 1]} renderOrder={4}>
                <spriteMaterial map={glow} transparent depthWrite={false} toneMapped={false} opacity={palette.glow * 0.52} />
              </sprite>
            </group>
          );
        })}
      </group>
    </>
  );
}

export default function ServiceJourneyScene(props: Props) {
  return (
    <Canvas orthographic camera={{ position: [0, 0.63, 12], near: 0.1, far: 35 }}
      frameloop="demand" dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "default" }}
      fallback={null}>
      <Journey {...props} />
    </Canvas>
  );
}
