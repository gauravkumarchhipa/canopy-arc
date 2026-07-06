"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
};

/**
 * Auth left-panel scene: rotating torus knot + particle halo.
 */
export default function AuthOrbScene({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const getTheme = () =>
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    let theme: "light" | "dark" = getTheme();

    const knotGeom = new THREE.TorusKnotGeometry(1.35, 0.38, 180, 24);
    const knotMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3b82f6"),
      wireframe: true,
      transparent: true,
      opacity: theme === "light" ? 0.55 : 0.75,
    });
    const knot = new THREE.Mesh(knotGeom, knotMat);
    scene.add(knot);

    const innerGeom = new THREE.TorusGeometry(2.1, 0.02, 8, 128);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#67e8f9"),
      transparent: true,
      opacity: 0.35,
    });
    const innerRing = new THREE.Mesh(innerGeom, innerMat);
    innerRing.rotation.x = Math.PI / 2.4;
    scene.add(innerRing);

    const COUNT = 2800;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const c1 = new THREE.Color("#67e8f9");
    const c2 = new THREE.Color("#3b82f6");
    const c3 = new THREE.Color("#818cf8");

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.8 + Math.random() * 1.8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      seeds[i] = Math.random();
      const mix = Math.random();
      const c = mix < 0.4 ? c1 : mix < 0.75 ? c2 : c3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    particleGeom.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 5 * renderer.getPixelRatio() },
      },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        attribute vec3 aColor;
        uniform float uTime;
        uniform float uSize;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec3 p = position;
          float wave = sin(uTime * 0.8 + aSeed * 6.28) * 0.22;
          p += normalize(p) * wave;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * (1.0 / -mv.z) * (0.5 + aSeed * 0.9);
          vColor = aColor;
          vAlpha = 0.8 - aSeed * 0.45;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener("pointermove", onPointer);

    const applyTheme = () => {
      const next = getTheme();
      if (next === theme) return;
      theme = next;
      knotMat.opacity = theme === "light" ? 0.55 : 0.75;
      particleMat.blending =
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
      particleMat.needsUpdate = true;
    };
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const start = performance.now();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = (performance.now() - start) / 1000;

      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;

      knot.rotation.x = t * 0.22 + mouse.y * 0.35;
      knot.rotation.y = t * 0.28 + mouse.x * 0.5;
      innerRing.rotation.z = t * 0.15;
      particles.rotation.y = t * 0.06 - mouse.x * 0.25;
      particles.rotation.x = mouse.y * 0.2;

      particleMat.uniforms.uTime.value = t;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      container.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      knotGeom.dispose();
      knotMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden
    />
  );
}
