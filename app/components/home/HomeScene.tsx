"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Persistent 3D scene for the home page — SAHAI signature aura.
 *
 *   🎙 A 3D microphone (capsule head + 3 grill bands + stem + base ring)
 *     with audio-wave shader displacement on its surface — sits still, no
 *     heartbeat pulsing, just a tiny lateral sway.
 *   🔊 A vertical voice-bar LED ring around it (smart-speaker style) —
 *     each bar pulses like an audio equalizer, instanced for one draw call.
 *   📡 Sound-wave pulse rings emanating outward at a steady cadence.
 *   ✨ Particle halo + ambient torus-particle field tying the scene together.
 *
 * Scroll moves / scales / re-tints the cluster across 7 stops.
 * Cursor parallax tilts the cluster + boosts amplitude near it.
 * Click triggers a brief voice-amplitude surge.
 */
export default function HomeScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const getTheme = () =>
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    let theme: "light" | "dark" = getTheme();

    // ──────────────────────────────────────────────────────────
    // 🎙 MICROPHONE — head capsule + grill bands + stem + base ring
    //
    //  Single shader (`heartMat`) is shared across all mic parts:
    //  audio-wave displacement on the surface + gradient palette that
    //  shifts with scroll. The whole `heartGroup` swells in lub-dub
    //  rhythm so the mic "breathes" while it listens.
    // ──────────────────────────────────────────────────────────
    const heartMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: 0.04 },
        uHeartbeat: { value: 0 },
        uColorA: { value: new THREE.Color("#67e8f9") },
        uColorB: { value: new THREE.Color("#3b82f6") },
        uColorC: { value: new THREE.Color("#1e3a8a") },
        uColorShift: { value: 0 },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uAmplitude;
        uniform float uHeartbeat;
        varying vec3 vNormal;
        varying vec3 vPos;
        varying vec3 vLocalPos;

        void main() {
          vec3 p = position;
          vec3 n = normalize(normal);

          // audio-wave shimmer ripples across the surface
          float wave =
              sin(p.y * 8.0 + uTime * 2.6) * 0.5
            + sin(p.x * 6.0 - uTime * 1.7) * 0.4
            + sin(p.z * 7.0 + uTime * 2.1) * 0.3;
          float disp = wave * uAmplitude + uHeartbeat * 0.05;

          vec3 displaced = p + n * disp;
          vLocalPos = position;
          vNormal = normalize(normalMatrix * n);
          vPos = displaced;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform float uColorShift;
        varying vec3 vNormal;
        varying vec3 vPos;
        varying vec3 vLocalPos;

        void main() {
          vec3 n = normalize(vNormal);
          float diff = max(dot(n, normalize(vec3(0.4, 0.7, 0.6))), 0.0);
          float fres = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 2.2);

          // vertical gradient — pink at the base, violet middle, cyan top
          float grad = clamp(vLocalPos.y * 0.6 + 0.5, 0.0, 1.0);
          float shift = fract(uColorShift);

          vec3 base = mix(uColorC, uColorB, grad);
          base = mix(base, uColorA, smoothstep(0.55, 1.0, grad));
          // scroll-driven hue rotation
          base = mix(base, uColorC, shift * 0.4);
          base = mix(base, uColorA, fres * 0.55);

          float shimmer = 0.10 * sin(vPos.y * 22.0 + uTime * 3.5);
          vec3 color = base * (0.55 + diff * 0.6) + fres * 0.7 * uColorA + shimmer;

          gl_FragColor = vec4(color, 0.96);
        }
      `,
    });

    // mic head — a rounded capsule (the cardioid body of the microphone)
    const micHeadGeom = new THREE.CapsuleGeometry(0.42, 0.55, 16, 32);
    const micHead = new THREE.Mesh(micHeadGeom, heartMat);
    micHead.position.y = 0.55;

    // grill bands — three thin torii wrapping the mic head, like a real
    // microphone grille. Sit slightly outside the capsule radius.
    const grillGeoms: THREE.TorusGeometry[] = [];
    const grillRings: THREE.Mesh[] = [];
    const grillYs = [0.85, 0.55, 0.25];
    grillYs.forEach((y) => {
      const g = new THREE.TorusGeometry(0.44, 0.018, 12, 64);
      const m = new THREE.Mesh(g, heartMat);
      m.position.y = y;
      m.rotation.x = Math.PI / 2;
      grillGeoms.push(g);
      grillRings.push(m);
    });

    // stem — thin cylinder connecting head to base
    const stemGeom = new THREE.CylinderGeometry(0.06, 0.085, 0.55, 16);
    const stem = new THREE.Mesh(stemGeom, heartMat);
    stem.position.y = -0.05;

    // base disc — small ring stand at the bottom
    const baseGeom = new THREE.TorusGeometry(0.42, 0.04, 16, 64);
    const base = new THREE.Mesh(baseGeom, heartMat);
    base.rotation.x = Math.PI / 2;
    base.position.y = -0.4;

    // ──────────────────────────────────────────────────────────
    // 🎙 BACK-GLOW — soft fresnel halo behind the mic head
    // ──────────────────────────────────────────────────────────
    const heartGlowGeom = new THREE.SphereGeometry(0.95, 32, 32);
    const heartGlowMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending,
      side: THREE.BackSide,
      uniforms: {
        uColor: { value: new THREE.Color("#3b82f6") },
        uIntensity: { value: theme === "light" ? 0.3 : 0.95 },
      },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uIntensity;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(uColor * intensity, intensity * 0.6 * uIntensity);
        }
      `,
    });
    const heartGlow = new THREE.Mesh(heartGlowGeom, heartGlowMat);
    heartGlow.position.y = 0.55;

    // ──────────────────────────────────────────────────────────
    // 🎙 VOICE-BAR LED RING — instanced vertical bars around the heart
    // ──────────────────────────────────────────────────────────
    const N_BARS = 64;
    const barGeom = new THREE.BoxGeometry(0.05, 1, 0.05);
    // Move pivot to bar's bottom so scaling.y grows upward
    barGeom.translate(0, 0.5, 0);

    const phases = new Float32Array(N_BARS);
    const palette = new Float32Array(N_BARS * 3);
    const cA = new THREE.Color("#67e8f9");
    const cB = new THREE.Color("#3b82f6");
    const cC = new THREE.Color("#1e3a8a");
    for (let i = 0; i < N_BARS; i++) {
      phases[i] = i / N_BARS;
      const m = i / N_BARS;
      const c = m < 0.34 ? cA : m < 0.67 ? cB : cC;
      palette[i * 3] = c.r;
      palette[i * 3 + 1] = c.g;
      palette[i * 3 + 2] = c.b;
    }
    barGeom.setAttribute(
      "aPhase",
      new THREE.InstancedBufferAttribute(phases, 1),
    );
    barGeom.setAttribute(
      "aBarColor",
      new THREE.InstancedBufferAttribute(palette, 3),
    );

    const barMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uHeartbeat: { value: 0 },
        uBoost: { value: 0 },
      },
      vertexShader: /* glsl */ `
        attribute float aPhase;
        attribute vec3 aBarColor;
        uniform float uTime;
        uniform float uHeartbeat;
        uniform float uBoost;
        varying vec3 vColor;
        varying float vY;

        void main() {
          // multi-frequency audio-EQ amplitude per bar
          float t = uTime;
          float a =
              sin(t * 3.0 + aPhase * 18.84) * 0.5
            + sin(t * 5.4 + aPhase * 11.56) * 0.3
            + sin(t * 1.7 + aPhase * 6.28) * 0.4;
          float h = 0.18 + (a * 0.5 + 0.5) * 0.55 + uHeartbeat * 0.45 + uBoost * 0.4;

          vec3 p = position;
          p.y *= h;

          vY = p.y / max(h, 0.001);
          vColor = aBarColor;

          gl_Position =
            projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vY;
        void main() {
          // brighter at the tip → glowing audio-bar look
          float glow = smoothstep(0.0, 1.0, vY);
          vec3 col = mix(vColor * 0.55, vColor * 1.4, glow);
          float alpha = 0.85;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const bars = new THREE.InstancedMesh(barGeom, barMat, N_BARS);
    bars.frustumCulled = false;
    const dummy = new THREE.Object3D();
    const BAR_RADIUS = 1.85;
    for (let i = 0; i < N_BARS; i++) {
      const a = (i / N_BARS) * Math.PI * 2;
      dummy.position.set(
        Math.cos(a) * BAR_RADIUS,
        -0.15,
        Math.sin(a) * BAR_RADIUS,
      );
      dummy.rotation.set(0, -a, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      bars.setMatrixAt(i, dummy.matrix);
    }
    bars.instanceMatrix.needsUpdate = true;
    bars.rotation.x = -0.12;

    // ──────────────────────────────────────────────────────────
    // 📡 SONAR PULSE RINGS — emanate at heartbeat tempo
    // ──────────────────────────────────────────────────────────
    type Ring = { mesh: THREE.Mesh; mat: THREE.ShaderMaterial };
    const rings: Ring[] = [];
    const RING_COUNT = 5;
    const ringGeom = new THREE.TorusGeometry(1.0, 0.012, 24, 220);

    for (let i = 0; i < RING_COUNT; i++) {
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uProgress: { value: i / RING_COUNT },
          uColor: { value: new THREE.Color("#67e8f9") },
          uOpacity: { value: 1.0 },
        },
        vertexShader: /* glsl */ `
          uniform float uProgress;
          void main() {
            float scale = 1.6 + uProgress * 3.2;
            vec3 p = position * scale;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uProgress;
          uniform vec3 uColor;
          uniform float uOpacity;
          void main() {
            float alpha = 1.0 - uProgress;
            alpha *= alpha;
            gl_FragColor = vec4(uColor, alpha * 0.85 * uOpacity);
          }
        `,
      });
      const mesh = new THREE.Mesh(ringGeom, mat);
      mesh.rotation.x = Math.PI / 2;
      rings.push({ mesh, mat });
    }

    // ──────────────────────────────────────────────────────────
    // ✨ HALO PARTICLES — floating around the heart
    // ──────────────────────────────────────────────────────────
    const HALO_COUNT = reduced ? 120 : 260;
    const haloPositions = new Float32Array(HALO_COUNT * 3);
    const haloSeeds = new Float32Array(HALO_COUNT);
    const haloColors = new Float32Array(HALO_COUNT * 3);

    for (let i = 0; i < HALO_COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.2 + Math.random() * 1.4;
      haloPositions[i * 3] = Math.cos(a) * r;
      haloPositions[i * 3 + 1] = (Math.random() - 0.5) * 1.4;
      haloPositions[i * 3 + 2] = Math.sin(a) * r * 0.6;
      haloSeeds[i] = Math.random();
      const m = Math.random();
      const c = m < 0.33 ? cA : m < 0.66 ? cB : cC;
      haloColors[i * 3] = c.r;
      haloColors[i * 3 + 1] = c.g;
      haloColors[i * 3 + 2] = c.b;
    }

    const haloGeom = new THREE.BufferGeometry();
    haloGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(haloPositions, 3),
    );
    haloGeom.setAttribute("aSeed", new THREE.BufferAttribute(haloSeeds, 1));
    haloGeom.setAttribute("aColor", new THREE.BufferAttribute(haloColors, 3));

    const haloMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPulse: { value: 0 },
        uSize: { value: 6 * renderer.getPixelRatio() },
      },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        attribute vec3 aColor;
        uniform float uTime;
        uniform float uPulse;
        uniform float uSize;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          float bob = sin(uTime * 1.6 + aSeed * 6.28) * 0.18;
          p.y += bob;

          float pulseRing = sin(uTime * 1.3 - aSeed * 6.28) * 0.5 + 0.5;
          vAlpha = 0.45 + pulseRing * 0.5 + uPulse * 0.4;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * (1.0 / -mv.z) * (0.6 + pulseRing * 0.7);
          vColor = aColor;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.0, d) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `,
    });
    const halo = new THREE.Points(haloGeom, haloMat);

    // ──────────────────────────────────────────────────────────
    // AMBIENT TORUS PARTICLE FIELD (background swirl)
    // ──────────────────────────────────────────────────────────
    const FIELD_COUNT = reduced ? 1200 : 3200;
    const fieldPositions = new Float32Array(FIELD_COUNT * 3);
    const fieldSeeds = new Float32Array(FIELD_COUNT);
    const fieldColors = new Float32Array(FIELD_COUNT * 3);

    for (let i = 0; i < FIELD_COUNT; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 3.0 + (Math.random() - 0.5) * 1.8;
      const tubeR = 0.85 + Math.random() * 0.5;
      const phi = Math.random() * Math.PI * 2;
      fieldPositions[i * 3] = (r + tubeR * Math.cos(phi)) * Math.cos(t);
      fieldPositions[i * 3 + 1] = tubeR * Math.sin(phi);
      fieldPositions[i * 3 + 2] = (r + tubeR * Math.cos(phi)) * Math.sin(t);
      fieldSeeds[i] = Math.random();
      const mix = Math.random();
      const c = mix < 0.4 ? cA : mix < 0.75 ? cB : cC;
      fieldColors[i * 3] = c.r;
      fieldColors[i * 3 + 1] = c.g;
      fieldColors[i * 3 + 2] = c.b;
    }

    const fieldGeom = new THREE.BufferGeometry();
    fieldGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(fieldPositions, 3),
    );
    fieldGeom.setAttribute("aSeed", new THREE.BufferAttribute(fieldSeeds, 1));
    fieldGeom.setAttribute("aColor", new THREE.BufferAttribute(fieldColors, 3));

    const fieldMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uTwist: { value: 0 },
        uOpacity: { value: 0 },
        uSize: { value: 5 * renderer.getPixelRatio() },
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
          vAlpha = 0.7 - aSeed * 0.5;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacity;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float alpha = smoothstep(0.5, 0.0, d) * vAlpha * uOpacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });
    const field = new THREE.Points(fieldGeom, fieldMat);

    // ──────────────────────────────────────────────────────────
    // GROUPING
    // ──────────────────────────────────────────────────────────
    const heartGroup = new THREE.Group(); // mic group — breathes with heartbeat scale
    heartGroup.add(heartGlow);
    heartGroup.add(micHead);
    grillRings.forEach((r) => heartGroup.add(r));
    heartGroup.add(stem);
    heartGroup.add(base);

    const cluster = new THREE.Group(); // moves with scroll stops
    cluster.add(heartGroup);
    cluster.add(bars);
    rings.forEach((r) => cluster.add(r.mesh));
    cluster.add(halo);

    const root = new THREE.Group();
    root.add(cluster);
    root.add(field);
    scene.add(root);

    // ──────────────────────────────────────────────────────────
    // INTERACTION
    // ──────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let amplitudeBoost = 0;
    let amplitudeBoostTarget = 0;

    const onPointer = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = -((e.clientY / h) * 2 - 1);
      target.x = nx;
      target.y = ny;

      const clusterScreen = new THREE.Vector3(
        cluster.position.x,
        cluster.position.y,
        cluster.position.z,
      ).project(camera);
      const dx = nx - clusterScreen.x;
      const dy = ny - clusterScreen.y;
      const dist = Math.min(Math.hypot(dx, dy), 1.2);
      amplitudeBoostTarget = Math.max(0, 1 - dist / 1.2) * 0.18;
    };

    const onLeave = () => {
      amplitudeBoostTarget = 0;
    };

    const onClick = () => {
      // brief voice surge — louder voice-bars + ring kick (no heartbeat pulse)
      amplitudeBoostTarget = 0.32;
      window.setTimeout(() => {
        amplitudeBoostTarget = 0;
      }, 240);
    };

    window.addEventListener("pointermove", onPointer);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("click", onClick);

    // theme reactivity
    const applyThemeToCanvas = () => {
      const next = getTheme();
      if (next === theme) return;
      theme = next;
      const blend =
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
      heartGlowMat.blending = blend;
      heartGlowMat.uniforms.uIntensity.value = theme === "light" ? 0.25 : 0.85;
      heartGlowMat.needsUpdate = true;
      barMat.blending = blend;
      barMat.needsUpdate = true;
      rings.forEach((r) => {
        r.mat.blending = blend;
        r.mat.needsUpdate = true;
      });
      haloMat.blending = blend;
      haloMat.needsUpdate = true;
      fieldMat.blending = blend;
      fieldMat.needsUpdate = true;
    };
    const themeObserver = new MutationObserver(applyThemeToCanvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    applyThemeToCanvas();

    let scrollY = 0;
    const onScroll = () => (scrollY = window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ──────────────────────────────────────────────────────────
    // SCROLL STOPS — interpolated (1 stop per viewport-height)
    // ──────────────────────────────────────────────────────────
    type Stop = {
      pos: [number, number, number];
      scale: number;
      tilt: [number, number];
      ringOpacity: number;
      fieldOpacity: number;
      fieldTwist: number;
      colorShift: number;
      amplitude: number;
    };

     // 12 stops, one per ~viewport-height of scroll.
    // Sections roughly map to: 0=Hero, 1-2=Promise, 3-5=HorizontalScroll (hidden),
    // 6-7=System, 8-9=Impact, 10=StoreCTA, 11=Final CTA.
    const STOPS: Stop[] = [
      // 0 — Hero: mic on the right
      { pos: [1.5, 0, 0], scale: 1.0, tilt: [0, 0], ringOpacity: 1, fieldOpacity: 0, fieldTwist: 0, colorShift: 0, amplitude: 0.04 },
      // 1 — Promise: mic on the left
      { pos: [-3.4, 0.2, -1.4], scale: 0.5, tilt: [-0.1, 0.25], ringOpacity: 0.3, fieldOpacity: 0.1, fieldTwist: 0.2, colorShift: 0.15, amplitude: 0.03 },
      // 2 — Promise late: stay on the left (don't drift to center)
      { pos: [-3.0, 0.05, -1.5], scale: 0.55, tilt: [-0.05, 0.2], ringOpacity: 0.3, fieldOpacity: 0.15, fieldTwist: 0.3, colorShift: 0.25, amplitude: 0.04 },
      // 3 — HorizontalScroll start (hidden behind solid bg)
      { pos: [0, -0.1, -1.5], scale: 0.55, tilt: [0.1, -0.05], ringOpacity: 0.3, fieldOpacity: 0.25, fieldTwist: 0.4, colorShift: 0.3, amplitude: 0.04 },
      // 4 — HorizontalScroll mid (hidden)
      { pos: [0, 0, -1.0], scale: 0.7, tilt: [0, 0], ringOpacity: 0.5, fieldOpacity: 0.5, fieldTwist: 0.6, colorShift: 0.4, amplitude: 0.04 },
      // 5 — HorizontalScroll end (hidden)
      { pos: [0, 0, -0.5], scale: 0.85, tilt: [0, 0], ringOpacity: 0.6, fieldOpacity: 1, fieldTwist: 1.0, colorShift: 0.45, amplitude: 0.05 },
      // 6 — System start: right, big
      { pos: [4.5, 0.1, -0.7], scale: 0.85, tilt: [-0.05, -0.4], ringOpacity: 0.7, fieldOpacity: 0.3, fieldTwist: 0.7, colorShift: 0.6, amplitude: 0.05 },
      // 7 — System mid: right, big
      { pos: [4.2, -0.15, -0.6], scale: 0.9, tilt: [-0.2, -0.35], ringOpacity: 0.85, fieldOpacity: 0.15, fieldTwist: 0.5, colorShift: 0.78, amplitude: 0.05 },
      // 8 — StoreCTA start: CENTERED, small. Mic slides from top-right (Impact) into center.
      { pos: [0, 0, -1.0], scale: 0.5, tilt: [0, 0], ringOpacity: 0.5, fieldOpacity: 0.2, fieldTwist: 0.3, colorShift: 0.9, amplitude: 0.04 },
      // 9 — StoreCTA end: CENTERED, hold the center position throughout the section.
      { pos: [0, 0, -1.0], scale: 0.5, tilt: [0, 0], ringOpacity: 0.5, fieldOpacity: 0.2, fieldTwist: 0.3, colorShift: 1.0, amplitude: 0.04 },
      // 10 — Final CTA start: back to top-right corner.
      { pos: [3.8, 1.2, -1.3], scale: 0.8, tilt: [-0.15, -0.4], ringOpacity: 0.4, fieldOpacity: 0.15, fieldTwist: 0.3, colorShift: 1.05, amplitude: 0.04 },
      // 11 — Final CTA end: stay top-right.
      { pos: [3.8, 1.2, -1.3], scale: 0.8, tilt: [-0.15, -0.4], ringOpacity: 0.4, fieldOpacity: 0.15, fieldTwist: 0.3, colorShift: 1.1, amplitude: 0.04 },
    ];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    const cur: Stop = JSON.parse(JSON.stringify(STOPS[0]));

    let raf = 0;
    const startedAt = performance.now();
    const update = () => {
      raf = requestAnimationFrame(update);
      const t = (performance.now() - startedAt) / 1000;

      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      amplitudeBoost += (amplitudeBoostTarget - amplitudeBoost) * 0.08;

      const vh = window.innerHeight;
      const raw = scrollY / vh;
      const idx = Math.min(Math.max(raw, 0), STOPS.length - 1);
      const i0 = Math.floor(idx);
      const i1 = Math.min(i0 + 1, STOPS.length - 1);
      const frac = smoothstep(idx - i0);
      const a = STOPS[i0];
      const b = STOPS[i1];

      const tx = lerp(a.pos[0], b.pos[0], frac);
      const ty = lerp(a.pos[1], b.pos[1], frac);
      const tz = lerp(a.pos[2], b.pos[2], frac);
      const ts = lerp(a.scale, b.scale, frac);
      const ttx = lerp(a.tilt[0], b.tilt[0], frac);
      const tty = lerp(a.tilt[1], b.tilt[1], frac);
      const tringOp = lerp(a.ringOpacity, b.ringOpacity, frac);
      const tfieldOp = lerp(a.fieldOpacity, b.fieldOpacity, frac);
      const tfieldTw = lerp(a.fieldTwist, b.fieldTwist, frac);
      const tcolorShift = lerp(a.colorShift, b.colorShift, frac);
      const tamp = lerp(a.amplitude, b.amplitude, frac);

      cur.pos[0] += (tx - cur.pos[0]) * 0.08;
      cur.pos[1] += (ty - cur.pos[1]) * 0.08;
      cur.pos[2] += (tz - cur.pos[2]) * 0.08;
      cur.scale += (ts - cur.scale) * 0.08;
      cur.tilt[0] += (ttx - cur.tilt[0]) * 0.06;
      cur.tilt[1] += (tty - cur.tilt[1]) * 0.06;
      cur.ringOpacity += (tringOp - cur.ringOpacity) * 0.08;
      cur.fieldOpacity += (tfieldOp - cur.fieldOpacity) * 0.06;
      cur.fieldTwist += (tfieldTw - cur.fieldTwist) * 0.06;
      cur.colorShift += (tcolorShift - cur.colorShift) * 0.04;
      cur.amplitude += (tamp - cur.amplitude) * 0.06;

      // Responsive scaling — desktop stops are calibrated for ~16:9 aspect.
      // On mobile portrait the camera FOV is much narrower, so we pull every
      // stop's lateral offset back toward center and shrink scale a bit so
      // the mic stays inside the viewport across all sections.
      const aspect = container.clientWidth / container.clientHeight;
      const isNarrow = aspect < 0.9;
      const xScale = isNarrow ? Math.max(0.3, aspect / 1.7) : 1;
      const yScale = isNarrow ? 0.55 : 1;
      const sScale = isNarrow ? 0.7 : 1;

      cluster.position.set(
        cur.pos[0] * xScale,
        cur.pos[1] * yScale,
        cur.pos[2],
      );
      cluster.scale.setScalar(cur.scale * sScale);
      cluster.rotation.x = cur.tilt[0] + mouse.y * 0.35;
      cluster.rotation.y = t * 0.12 + cur.tilt[1] + mouse.x * 0.5;

      // mic stays still — no heartbeat scaling, only a tiny lateral sway
      heartGroup.scale.setScalar(1);
      heartGroup.rotation.z = Math.sin(t * 0.35) * 0.025;

      heartMat.uniforms.uTime.value = t;
      heartMat.uniforms.uAmplitude.value =
        cur.amplitude + amplitudeBoost * 0.7;
      heartMat.uniforms.uHeartbeat.value = 0;
      heartMat.uniforms.uColorShift.value = cur.colorShift;

      barMat.uniforms.uTime.value = t;
      barMat.uniforms.uHeartbeat.value = 0;
      barMat.uniforms.uBoost.value = amplitudeBoost;

      haloMat.uniforms.uTime.value = t;
      haloMat.uniforms.uPulse.value = amplitudeBoost * 4;

      rings.forEach((r) => {
        // rings emanate at a steady voice-pulse cadence
        r.mat.uniforms.uProgress.value =
          (r.mat.uniforms.uProgress.value +
            0.0035 +
            amplitudeBoost * 0.01) %
          1;
        r.mat.uniforms.uOpacity.value = cur.ringOpacity;
      });

      field.rotation.y = t * 0.05 + mouse.x * 0.4;
      field.rotation.x = mouse.y * 0.25;
      fieldMat.uniforms.uTime.value = t;
      fieldMat.uniforms.uTwist.value = cur.fieldTwist;
      fieldMat.uniforms.uOpacity.value = cur.fieldOpacity;

      renderer.render(scene, camera);
    };
    update();

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      micHeadGeom.dispose();
      stemGeom.dispose();
      baseGeom.dispose();
      grillGeoms.forEach((g) => g.dispose());
      heartMat.dispose();
      heartGlowGeom.dispose();
      heartGlowMat.dispose();
      barGeom.dispose();
      barMat.dispose();
      ringGeom.dispose();
      rings.forEach((r) => r.mat.dispose());
      haloGeom.dispose();
      haloMat.dispose();
      fieldGeom.dispose();
      fieldMat.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
      const canvas = renderer.domElement;
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="home-scene-canvas"
      aria-hidden
    />
  );
}
