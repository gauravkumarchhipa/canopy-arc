"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useTheme } from "../layout/ThemeProvider";
import { buildSculpture, type SculptureVariant } from "./sculptures";
import type { ModelPose } from "./useModelOrbit";

type Props = {
  variant: SculptureVariant;
  paused: boolean;
  angle: number;
  reset: number;
  hoverPose: ModelPose;
  onAvailabilityChange: (available: boolean) => void;
};
type Settings = {
  theme: string;
  paused: boolean;
  angle: number;
  reset: number;
  hoverPose: ModelPose;
};

export default function SculptureScene({
  variant,
  paused,
  angle,
  reset,
  hoverPose,
  onAvailabilityChange,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const apply = useRef<((settings: Settings) => void) | null>(null);
  const latest = useRef<Settings>({ theme, paused, angle, reset, hoverPose });

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      onAvailabilityChange(false);
      return;
    }
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1 : 1.5),
    );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40);
    const model = buildSculpture(variant);
    const baseRotation = model.group.rotation.clone();
    scene.add(model.group);
    const environmentGenerator = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = environmentGenerator.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    environmentGenerator.dispose();
    const key = new THREE.DirectionalLight("#ffffff", 3);
    key.position.set(-3, 5, 5);
    const rim = new THREE.DirectionalLight("#eeeae0", 2);
    rim.position.set(4, 1, -3);
    scene.add(key, rim, new THREE.AmbientLight("#ffffff", 0.65));
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.enableRotate = window.matchMedia("(pointer: fine)").matches;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.7;
    controls.rotateSpeed = 0.55;
    controls.target.set(0, -0.02, 0);
    let frame = 0;
    let visible = false;
    let lost = false;
    let disposed = false;
    let moving = !latest.current.paused;
    let rotation = latest.current.angle;
    let resetVersion = latest.current.reset;
    let lastTime = 0;
    let elapsed = 0;
    let reportedReady = false;
    const hover = { yaw: 0, pitch: 0 };
    const positionCamera = () => {
      camera.position.set(
        Math.sin(rotation) * 7.2,
        1.3,
        Math.cos(rotation) * 7.2,
      );
      controls.update();
    };
    const render = (time: number) => {
      frame = 0;
      if (disposed || lost || !visible || document.hidden) return;
      const delta = lastTime ? Math.min(time - lastTime, 50) / 1000 : 1 / 60;
      if (moving && lastTime) elapsed += delta * 1000;
      lastTime = time;
      const target = latest.current.hoverPose;
      hover.yaw = THREE.MathUtils.damp(hover.yaw, target.yaw, 8, delta);
      hover.pitch = THREE.MathUtils.damp(hover.pitch, target.pitch, 8, delta);
      model.group.position.y = Math.sin(elapsed * 0.00065) * 0.06;
      model.group.rotation.x = baseRotation.x + hover.pitch;
      model.group.rotation.y =
        baseRotation.y + Math.sin(elapsed * 0.0003) * 0.09 + hover.yaw;
      renderer.render(scene, camera);
      element.dataset.ready = "true";
      element.dataset.motion = moving ? "playing" : "paused";
      if (!reportedReady) {
        reportedReady = true;
        onAvailabilityChange(true);
      }
      if (moving || Math.abs(hover.yaw - target.yaw) + Math.abs(hover.pitch - target.pitch) > 0.001) {
        frame = requestAnimationFrame(render);
      }
    };
    const invalidate = () => {
      if (!frame && visible && !document.hidden && !lost && !disposed)
        frame = requestAnimationFrame(render);
    };
    apply.current = (settings) => {
      const dark = settings.theme === "dark";
      model.setTheme(dark);
      renderer.toneMappingExposure = dark ? 1.25 : 1.05;
      moving = !settings.paused;
      if (settings.angle !== rotation || settings.reset !== resetVersion) {
        rotation = settings.angle;
        resetVersion = settings.reset;
        positionCamera();
      }
      lastTime = 0;
      invalidate();
    };
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      if (variant === "team") {
        model.group.scale.setScalar(THREE.MathUtils.clamp(width / height * 0.73, 0.94, 1.28));
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      invalidate();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
      } else invalidate();
    });
    const sizes = new ResizeObserver(resize);
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
      } else invalidate();
    };
    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(frame);
      frame = 0;
      delete element.dataset.ready;
      reportedReady = false;
      onAvailabilityChange(false);
    };
    const onRestored = () => {
      lost = false;
      invalidate();
    };
    controls.addEventListener("change", invalidate);
    document.addEventListener("visibilitychange", onVisibility);
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    renderer.domElement.addEventListener("webglcontextrestored", onRestored);
    positionCamera();
    apply.current(latest.current);
    resize();
    observer.observe(element);
    sizes.observe(element);
    return () => {
      disposed = true;
      apply.current = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizes.disconnect();
      controls.removeEventListener("change", invalidate);
      controls.dispose();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        onRestored,
      );
      model.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete element.dataset.ready;
    };
  }, [variant, onAvailabilityChange]);

  useEffect(() => {
    latest.current = { theme, paused, angle, reset, hoverPose };
    apply.current?.(latest.current);
  }, [theme, paused, angle, reset, hoverPose]);

  return <div ref={host} className="sculpture-canvas" aria-hidden="true" />;
}
