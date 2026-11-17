"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useTheme } from "../../layout/ThemeProvider";
import type { Theme } from "../../../lib/theme";

export default function CanopyScene() {
  const host = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const updateTheme = useRef<((theme: Theme) => void) | null>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = theme === "dark" ? 1.25 : 1.05;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, .1, 50);
    camera.position.set(5.5, 3.8, 7.5);
    camera.lookAt(0, .55, 0);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, .04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    const sculpture = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: theme === "dark" ? "#d0d0ca" : "#b3b3ad", metalness: .94, roughness: .23 });
    const geometries: THREE.BufferGeometry[] = [];
    // Structural arches turn the brand canopy into a protective pavilion.
    for (let rib = 0; rib < 23; rib++) {
      const z = (rib / 22 - .5) * 2.9;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 48; j++) {
        const t = j / 48;
        points.push(new THREE.Vector3((t - .5) * 4.5, Math.sin(t * Math.PI) * (2.65 - Math.abs(z) * .33) - .9, z + Math.sin(t * Math.PI) * .16));
      }
      const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 64, .038, 8, false);
      geometries.push(geometry);
      sculpture.add(new THREE.Mesh(geometry, material));
    }
    sculpture.rotation.y = -.28;
    sculpture.rotation.z = -.08;
    scene.add(sculpture);
    const light = new THREE.DirectionalLight("#ffffff", 4);
    light.position.set(-3, 6, 4);
    scene.add(light, new THREE.AmbientLight("#ffffff", .6));
    const rim = new THREE.DirectionalLight(theme === "dark" ? "#aebcd2" : "#ffffff", 2);
    rim.position.set(4, 1, -3);
    scene.add(rim);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let disposed = false;
    let pointerX = 0;
    let pointerY = 0;
    const render = (time: number) => {
      if (disposed) return;
      sculpture.rotation.y = THREE.MathUtils.lerp(sculpture.rotation.y, -.28 + pointerX * .14, .04);
      sculpture.rotation.x = THREE.MathUtils.lerp(sculpture.rotation.x, pointerY * .08, .04);
      sculpture.position.y = reduced.matches ? 0 : Math.sin(time * .00045) * .07;
      renderer.render(scene, camera);
      element.dataset.ready = "true";
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(render);
    };
    const start = () => { cancelAnimationFrame(frame); if (visible && !document.hidden) frame = requestAnimationFrame(render); };
    updateTheme.current = next => {
      material.color.set(next === "dark" ? "#d0d0ca" : "#b3b3ad");
      rim.color.set(next === "dark" ? "#aebcd2" : "#ffffff");
      renderer.toneMappingExposure = next === "dark" ? 1.25 : 1.05;
      start();
    };
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      start();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); }, { rootMargin: "80px" });
    observer.observe(element);
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(element);
    const pointer = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType === "touch") return;
      const rect = element.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - .5;
      pointerY = (event.clientY - rect.top) / rect.height - .5;
    };
    const contextLost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); delete element.dataset.ready; };
    const contextRestored = () => start();
    element.addEventListener("pointermove", pointer);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    renderer.domElement.addEventListener("webglcontextrestored", contextRestored);
    document.addEventListener("visibilitychange", start);
    reduced.addEventListener("change", start);
    resize();
    return () => {
      disposed = true;
      updateTheme.current = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      element.removeEventListener("pointermove", pointer);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", contextRestored);
      document.removeEventListener("visibilitychange", start);
      reduced.removeEventListener("change", start);
      geometries.forEach(geometry => geometry.dispose());
      material.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete element.dataset.ready;
    };
  }, []);
  useEffect(() => { updateTheme.current?.(theme); }, [theme]);
  return <div ref={host} className="canopy-canvas" aria-hidden="true" />;
}
