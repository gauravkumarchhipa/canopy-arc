"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
};

/**
 * Procedural particle field built with three.js.
 * Mouse moves the camera; scroll twists the field.
 */
export default function OrbField({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // particle geometry — a torus distribution
    const COUNT = 4500;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const c1 = new THREE.Color("#67e8f9");
    const c2 = new THREE.Color("#3b82f6");
    const c3 = new THREE.Color("#1e3a8a");

    for (let i = 0; i < COUNT; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 2.4 + (Math.random() - 0.5) * 1.6;
      const tubeR = 0.7 + Math.random() * 0.4;
      const phi = Math.random() * Math.PI * 2;
      const x = (r + tubeR * Math.cos(phi)) * Math.cos(t);
      const y = tubeR * Math.sin(phi);
      const z = (r + tubeR * Math.cos(phi)) * Math.sin(t);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      seeds[i] = Math.random();

      const mix = Math.random();
      const c = mix < 0.4 ? c1 : mix < 0.75 ? c2 : c3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geom.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const getTheme = () =>
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    let theme: "light" | "dark" = getTheme();

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uTwist: { value: 0 },
        uSize: { value: 6 * renderer.getPixelRatio() },
      },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        attribute vec3 aColor;
        uniform float uTime;
        uniform float uTwist;
        uniform float uSize;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec3 p = position;
          float angle = uTwist * (p.y * 0.4 + aSeed * 0.6);
          float c = cos(angle);
          float s = sin(angle);
          mat2 rot = mat2(c, -s, s, c);
          p.xz = rot * p.xz;

          p.y += sin(uTime * 0.6 + aSeed * 6.28) * 0.18;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * (1.0 / -mv.z) * (0.6 + aSeed * 0.8);
          vColor = aColor;
          vAlpha = 0.75 - aSeed * 0.5;
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

    const points = new THREE.Points(geom, material);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer);

    const applyThemeToCanvas = () => {
      const next = getTheme();
      if (next === theme) return;
      theme = next;
      material.blending =
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
      material.needsUpdate = true;
    };
    const themeObserver = new MutationObserver(applyThemeToCanvas);
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

      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;

      points.rotation.y = t * 0.08 + mouse.x * 0.6;
      points.rotation.x = mouse.y * 0.4;

      // scroll-driven twist
      const scrollNorm = Math.min(window.scrollY / window.innerHeight, 3);
      material.uniforms.uTwist.value = scrollNorm * 0.6;
      material.uniforms.uTime.value = t;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geom.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} className={className} aria-hidden />;
}
