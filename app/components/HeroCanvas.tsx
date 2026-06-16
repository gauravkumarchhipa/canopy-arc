"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Voice-assistant hero scene.
 *
 *  - central "voice orb" with audio-wave displacement (sound moving over a sphere)
 *  - concentric sound-wave rings continuously emanating outward
 *  - equator particle ring, like a smart-speaker LED halo
 *  - mouse-driven parallax tilt + amplitude boost ("speaks louder")
 *  - scroll-driven scale + rotation
 */

type Props = { className?: string };

export default function HeroCanvas({ className }: Props = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ──────────────────────────────────────────────────────────
    // VOICE ORB — icosphere with audio-wave shader displacement
    // ──────────────────────────────────────────────────────────
    const orbGeom = new THREE.IcosahedronGeometry(1.05, 96);

    const orbMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: 0.06 },
        uColorA: { value: new THREE.Color("#67e8f9") },
        uColorB: { value: new THREE.Color("#3b82f6") },
        uColorC: { value: new THREE.Color("#1e3a8a") },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uAmplitude;

        varying vec3 vNormal;
        varying float vDisp;
        varying vec3 vPos;

        // simplex noise — Ashima
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        float snoise(vec3 v){
          const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
          vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
          vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g;
          vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
          vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
          i=mod289(i);
          vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))
            +i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
          float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
          vec4 j=p-49.0*floor(p*ns.z*ns.z);
          vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
          vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy;
          vec4 h=1.0-abs(x)-abs(y);
          vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
          vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0;
          vec4 sh=-step(h,vec4(0.0));
          vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
          vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
          vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
          vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
          vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
          m=m*m;
          return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main() {
          vec3 p = position;
          vec3 n = normalize(p);

          // audio waves — multiple sin/cos layers travelling around the sphere
          float t = uTime;
          float wave =
              sin(p.y * 7.0 + t * 2.6) * 0.5
            + sin(p.x * 5.0 - t * 1.7) * 0.4
            + sin(p.z * 6.0 + t * 2.1) * 0.3
            + snoise(p * 1.8 + vec3(0.0, t * 0.6, 0.0)) * 0.5;

          float disp = wave * uAmplitude;

          vec3 displaced = p + n * disp;

          vDisp = disp;
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

        varying vec3 vNormal;
        varying float vDisp;
        varying vec3 vPos;

        void main() {
          vec3 n = normalize(vNormal);

          // soft directional lighting
          vec3 lightDir = normalize(vec3(0.5, 0.7, 0.6));
          float diff = max(dot(n, lightDir), 0.0);

          // fresnel rim
          float fres = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 2.4);

          float t = clamp(vDisp * 6.0 + 0.5, 0.0, 1.0);
          vec3 base = mix(uColorA, uColorB, t);
          base = mix(base, uColorC, fres);

          // soft horizontal shimmer like a voice line
          float shimmer = 0.12 * sin(vPos.y * 14.0 + uTime * 3.0);

          vec3 color = base * (0.55 + diff * 0.6) + fres * 0.7 * uColorC + shimmer;

          gl_FragColor = vec4(color, 0.95);
        }
      `,
    });

    const orb = new THREE.Mesh(orbGeom, orbMat);
    scene.add(orb);

    const getTheme = () =>
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    let theme: "light" | "dark" = getTheme();

    // glow shell — a slightly larger inverted sphere with additive shader
    const glowGeom = new THREE.IcosahedronGeometry(1.45, 32);
    const glowMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending,
      side: THREE.BackSide,
      uniforms: {
        uColor: { value: new THREE.Color("#3b82f6") },
        uIntensity: { value: theme === "light" ? 0.35 : 1.0 },
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
    const glow = new THREE.Mesh(glowGeom, glowMat);
    scene.add(glow);

    // ──────────────────────────────────────────────────────────
    // SOUND-WAVE RINGS — continuously expanding torii
    // ──────────────────────────────────────────────────────────
    type Ring = { mesh: THREE.Mesh; mat: THREE.ShaderMaterial; offset: number };
    const rings: Ring[] = [];
    const RING_COUNT = 4;
    const ringGeom = new THREE.TorusGeometry(1.0, 0.012, 24, 220);

    for (let i = 0; i < RING_COUNT; i++) {
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uProgress: { value: i / RING_COUNT },
          uColor: { value: new THREE.Color("#67e8f9") },
        },
        vertexShader: /* glsl */ `
          uniform float uProgress;
          void main() {
            float scale = 1.0 + uProgress * 3.4;
            vec3 p = position * scale;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uProgress;
          uniform vec3 uColor;
          void main() {
            float alpha = 1.0 - uProgress;
            alpha *= alpha;
            gl_FragColor = vec4(uColor, alpha * 0.85);
          }
        `,
      });
      const mesh = new THREE.Mesh(ringGeom, mat);
      mesh.rotation.x = Math.PI / 2;
      scene.add(mesh);
      rings.push({ mesh, mat, offset: i / RING_COUNT });
    }

    // ──────────────────────────────────────────────────────────
    // EQUATOR PARTICLE HALO — like a smart-speaker LED ring
    // ──────────────────────────────────────────────────────────
    const HALO_COUNT = 220;
    const haloPositions = new Float32Array(HALO_COUNT * 3);
    const haloSeeds = new Float32Array(HALO_COUNT);
    const haloColors = new Float32Array(HALO_COUNT * 3);

    const cA = new THREE.Color("#67e8f9");
    const cB = new THREE.Color("#3b82f6");
    const cC = new THREE.Color("#1e3a8a");

    for (let i = 0; i < HALO_COUNT; i++) {
      const a = (i / HALO_COUNT) * Math.PI * 2;
      const r = 1.7;
      haloPositions[i * 3] = Math.cos(a) * r;
      haloPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      haloPositions[i * 3 + 2] = Math.sin(a) * r;
      haloSeeds[i] = Math.random();
      const m = i / HALO_COUNT;
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
          float bob = sin(uTime * 2.0 + aSeed * 6.28) * 0.04;
          p.y += bob;

          float pulseRing = sin(uTime * 1.6 - aSeed * 6.28) * 0.5 + 0.5;
          vAlpha = 0.55 + pulseRing * 0.45 + uPulse * 0.4;

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
    halo.rotation.x = -0.18;
    scene.add(halo);

    // grouping for global tilt
    const group = new THREE.Group();
    group.add(orb);
    group.add(glow);
    rings.forEach((r) => group.add(r.mesh));
    group.add(halo);
    scene.add(group);

    // ──────────────────────────────────────────────────────────
    // INTERACTION + LOOP
    // ──────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const amplitudeBase = 0.06;
    let amplitudeBoost = 0;
    let amplitudeBoostTarget = 0;

    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      target.x = nx;
      target.y = ny;

      // distance from centre (normalized) — closer to centre = louder voice
      const distFromCenter = Math.min(Math.hypot(nx, ny), 1);
      amplitudeBoostTarget = (1 - distFromCenter) * 0.18;
    };

    const onLeave = () => {
      amplitudeBoostTarget = 0;
    };

    const onClick = () => {
      // pop a sound wave on click
      amplitudeBoostTarget = 0.32;
      setTimeout(() => (amplitudeBoostTarget = 0), 220);
    };

    window.addEventListener("pointermove", onPointer);
    container.addEventListener("pointerleave", onLeave);
    container.addEventListener("click", onClick);

    // react to theme changes — switch glow blending + intensity
    const applyThemeToCanvas = () => {
      const next = getTheme();
      if (next === theme) return;
      theme = next;
      glowMat.blending =
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
      glowMat.uniforms.uIntensity.value = theme === "light" ? 0.35 : 1.0;
      glowMat.needsUpdate = true;
      // tone down rings + halo on light bg too
      rings.forEach((r) => {
        r.mat.blending =
          theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
        r.mat.needsUpdate = true;
      });
      haloMat.blending =
        theme === "light" ? THREE.NormalBlending : THREE.AdditiveBlending;
      haloMat.needsUpdate = true;
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

    let raf = 0;
    const startedAt = performance.now();
    const update = () => {
      raf = requestAnimationFrame(update);
      const t = (performance.now() - startedAt) / 1000;

      // smooth mouse follow
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      amplitudeBoost += (amplitudeBoostTarget - amplitudeBoost) * 0.08;

      // breathing baseline so the orb is always alive
      const breath = (Math.sin(t * 1.4) * 0.5 + 0.5) * 0.04;
      orbMat.uniforms.uTime.value = t;
      orbMat.uniforms.uAmplitude.value = amplitudeBase + breath + amplitudeBoost;

      haloMat.uniforms.uTime.value = t;
      haloMat.uniforms.uPulse.value = amplitudeBoost * 4;

      // expanding sound rings
      rings.forEach((r) => {
        r.mat.uniforms.uProgress.value =
          (r.mat.uniforms.uProgress.value + 0.0035 + amplitudeBoost * 0.01) % 1;
      });

      // group rotation: subtle, mouse parallax + scroll
      const scrollNorm = Math.min(scrollY / window.innerHeight, 1.5);
      group.rotation.y = t * 0.18 + mouse.x * 0.5;
      group.rotation.x = mouse.y * 0.35 + scrollNorm * -0.4;
      group.position.y = -scrollNorm * 0.4;

      const s = 1 - scrollNorm * 0.08;
      group.scale.setScalar(s);

      renderer.render(scene, camera);
    };
    update();

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      container.removeEventListener("pointerleave", onLeave);
      container.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      orbGeom.dispose();
      orbMat.dispose();
      glowGeom.dispose();
      glowMat.dispose();
      ringGeom.dispose();
      rings.forEach((r) => r.mat.dispose());
      haloGeom.dispose();
      haloMat.dispose();
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
      className={className ?? "absolute inset-0 z-0"}
      aria-hidden
      data-cursor="hover"
    />
  );
}
