import * as THREE from "three";
import { makeStrands } from "../../sections/home/story-geometry";

export type NavbarMarkScene = {
  resize: () => void;
  dispose: () => void;
};

export function mountNavbarMark(host: HTMLSpanElement): NavbarMarkScene | undefined {
  const link = host.closest(".premium-logo");
  if (!link) return;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    return;
  }

  const canvas = renderer.domElement;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
  camera.position.set(0, -0.06, 5.24);
  const mark = new THREE.Group();
  const navbarGeometry = { poseCount: 1, gaugeScale: 2.05 };
  const metal = makeStrands(true, false, navbarGeometry);
  const glass = makeStrands(true, true, navbarGeometry);
  const metalFinish = new THREE.MeshStandardMaterial({
    vertexColors: true, metalness: 0.28, roughness: 0.44, emissive: "#e5d7bf",
  });
  const glassFinish = new THREE.MeshStandardMaterial({ metalness: 0.30, roughness: 0.38, emissive: "#c7d7db" });
  mark.add(new THREE.Mesh(metal, metalFinish), new THREE.Mesh(glass, glassFinish));
  const key = new THREE.DirectionalLight("#fff7ea", 2);
  key.position.set(-3, 4, 5);
  const fill = new THREE.DirectionalLight("#f0f6ff", 0.85);
  fill.position.set(4, -1, 2);
  scene.add(mark, key, fill, new THREE.HemisphereLight("#ece8db", "#a8a099", 1.1));
  host.append(canvas);

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const restAngle = -0.14;
  let frame = 0;
  let lost = false;
  mark.rotation.y = reducedMotion.matches ? restAngle : -0.47;

  const draw = () => {
    frame = 0;
    if (document.hidden || lost) return;
    const dark = root.dataset.theme === "dark";
    const active = !reducedMotion.matches && link.matches(":hover, :focus-visible");
    const target = active ? 0.36 : restAngle;
    mark.rotation.y = reducedMotion.matches ? target : THREE.MathUtils.lerp(mark.rotation.y, target, 0.17);
    metalFinish.color.set(dark ? "#fff2d9" : "#241f1b");
    metalFinish.emissiveIntensity = dark ? 0.45 : 0;
    glassFinish.color.set(dark ? "#d8e7eb" : "#3d494a");
    glassFinish.emissiveIntensity = dark ? 0.32 : 0;
    renderer.render(scene, camera);
    host.dataset.ready = "";
    if (Math.abs(mark.rotation.y - target) > 0.002) requestDraw();
  };

  function requestDraw() {
    if (!frame && !document.hidden && !lost) frame = requestAnimationFrame(draw);
  }

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = host;
    if (width === 0 || height === 0) return;
    renderer.setPixelRatio(Math.max(2, Math.min(window.devicePixelRatio, 3)));
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    requestDraw();
  };

  const onLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    delete host.dataset.ready;
  };
  const onRestored = () => {
    lost = false;
    requestDraw();
  };

  const theme = new MutationObserver(requestDraw);
  theme.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  const interactionEvents = ["pointerenter", "pointerleave", "focus", "blur"];
  interactionEvents.forEach((name) => link.addEventListener(name, requestDraw));
  reducedMotion.addEventListener("change", requestDraw);
  document.addEventListener("visibilitychange", requestDraw);
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  resize();

  return {
    resize,
    dispose: () => {
      cancelAnimationFrame(frame);
      theme.disconnect();
      interactionEvents.forEach((name) => link.removeEventListener(name, requestDraw));
      reducedMotion.removeEventListener("change", requestDraw);
      document.removeEventListener("visibilitychange", requestDraw);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      renderer.dispose();
      renderer.forceContextLoss();
      metal.dispose();
      glass.dispose();
      metalFinish.dispose();
      glassFinish.dispose();
      canvas.remove();
      delete host.dataset.ready;
    },
  };
}
