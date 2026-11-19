"use client";

import { useEffect, type RefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import type { CardModel } from "./card-model-geometry";

type ThemedCardModel = CardModel & { setDarkTheme?: (dark: boolean) => void };
type Card = {
  canvas: HTMLCanvasElement;
  model?: ThemedCardModel;
  visible: boolean;
  yaw: number;
  pitch: number;
  hoverOffset: number;
  hoverPaused: boolean;
};
type Drag = { card: Card; pointerId: number; x: number; y: number; moved: boolean };

const canvasSelector = "canvas[data-card-model]";
const yawPerPixel = Math.PI / 192;
const keyboardStep = Math.PI / 8;

export type CardLighting = {
  exposure: number;
  key: number;
  rim: number;
  rimColor: string;
  fill: number;
};

const studioLighting = {
  light: { exposure: 1.02, key: 2.15, rim: 2.3, rimColor: "#ffd6a0", fill: 1.05 },
  dark: { exposure: 0.88, key: 2.15, rim: 2.3, rimColor: "#ffd6a0", fill: 1.05 },
};

type Props = {
  gridRef: RefObject<HTMLDivElement | null>;
  buildModel: (id: string) => ThemedCardModel | null;
  instructionsId: string;
  lighting?: { light: CardLighting; dark: CardLighting };
};

export default function CardModels({ gridRef, buildModel, instructionsId, lighting = studioLighting }: Props) {
  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;
    const grid = element;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20);
    camera.position.set(0, 0.48, 6);
    camera.lookAt(0, 0, 0);
    const key = new THREE.DirectionalLight("#fff8ef");
    key.position.set(-3, 5, 4);
    const rim = new THREE.DirectionalLight();
    rim.position.set(2, -2, -3);
    const fill = new THREE.HemisphereLight("#fff7e9", "#beb09b");
    scene.add(key, rim, fill);

    let environment: THREE.WebGLRenderTarget | undefined;
    function createEnvironment() {
      const room = new RoomEnvironment();
      const generator = new THREE.PMREMGenerator(renderer);
      try {
        environment = generator.fromScene(room, 0.045, 0.1, 25, { size: 64 });
        scene.environment = environment.texture;
      } finally {
        room.dispose();
        generator.dispose();
      }
    }

    // One WebGL renderer draws the visible models into ordinary 2D canvases.
    const cards = new Map<HTMLCanvasElement, Card>();
    const dirty = new Set<Card>();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lost = false;
    let previousActive: Card | undefined;
    let activeSince = 0;
    let drag: Drag | undefined;
    let suppressClick: Card | undefined;
    let appliedDarkTheme: boolean | undefined;

    function schedule() {
      if (!frame && !lost && !document.hidden) frame = requestAnimationFrame(render);
    }

    function refresh() {
      for (const card of cards.values()) {
        if (card.visible) dirty.add(card);
      }
      if (dirty.size) schedule();
    }

    function updateLighting(dark: boolean) {
      if (dark === appliedDarkTheme) return;
      appliedDarkTheme = dark;
      const settings = dark ? lighting.dark : lighting.light;
      renderer.toneMappingExposure = settings.exposure;
      key.intensity = settings.key;
      rim.intensity = settings.rim;
      rim.color.set(settings.rimColor);
      fill.intensity = settings.fill;
    }

    function draw(card: Card, dark: boolean) {
      const { canvas } = card;
      const context = canvas.getContext("2d");
      if (!context || !canvas.clientWidth || !canvas.clientHeight) return;
      card.model ??= buildModel(canvas.dataset.cardModel ?? "") ?? undefined;
      if (!card.model) return;
      card.model.setDarkTheme?.(dark);

      const { rig, size } = card.model;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const width = Math.round(canvas.clientWidth * dpr);
      const height = Math.round(canvas.clientHeight * dpr);
      const aspect = width / height;
      const halfHeight = Math.max(size.y, size.x / aspect) * 0.55;
      camera.left = -halfHeight * aspect;
      camera.right = halfHeight * aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
        renderer.setSize(width, height, false);
      }
      const { hoverOffset, pitch, yaw } = card;
      rig.rotation.set(pitch + hoverOffset * 0.22, yaw + hoverOffset, 0, "YXZ");
      scene.add(rig);
      try {
        renderer.render(scene, camera);
        context.clearRect(0, 0, width, height);
        context.drawImage(renderer.domElement, 0, 0);
        if (!canvas.dataset.modelReady) {
          canvas.dataset.modelReady = "true";
          canvas.closest("a")?.setAttribute("aria-describedby", instructionsId);
        }
      } finally {
        scene.remove(rig);
      }
    }

    function render(time: number) {
      frame = 0;
      if (lost || document.hidden) return;
      const activeCanvas = motion.matches ? null : grid.querySelector<HTMLCanvasElement>(
        `[data-model-card]:is(:hover, :focus-visible, :has(:focus-visible)) ${canvasSelector}`,
      );
      const hovered = activeCanvas ? cards.get(activeCanvas) : undefined;
      const candidate = hovered?.visible ? hovered : undefined;
      if (candidate !== previousActive) {
        if (previousActive) {
          previousActive.hoverPaused = false;
          if (previousActive.visible) dirty.add(previousActive);
        }
        activeSince = time;
        previousActive = candidate;
      }
      const active = candidate && !candidate.hoverPaused && drag?.card !== candidate ? candidate : undefined;
      if (active) dirty.add(active);
      if (!dirty.size) return;

      try {
        if (!environment) createEnvironment();
        const dark = document.documentElement.dataset.theme === "dark";
        updateLighting(dark);
        for (const card of dirty) {
          card.hoverOffset = card === active ? Math.sin((time - activeSince) * 0.0018) * 0.37 : 0;
          draw(card, dark);
        }
      } catch {
        lost = true;
        clearModelAvailability();
      }
      dirty.clear();
      if (active) schedule();
    }

    const intersection = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const card = cards.get(entry.target as HTMLCanvasElement);
        if (!card) continue;
        card.visible = entry.isIntersecting;
        if (card.visible) dirty.add(card);
        else dirty.delete(card);
      }
      schedule();
    });
    const resize = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const card = cards.get(entry.target as HTMLCanvasElement);
        if (card?.visible) dirty.add(card);
      }
      if (dirty.size) schedule();
    });

    function findReadyCard(target: EventTarget | null) {
      if (!(target instanceof Element)) return undefined;
      const canvas = target.closest(canvasSelector) ?? target.closest("a")?.querySelector(canvasSelector);
      return canvas instanceof HTMLCanvasElement && canvas.dataset.modelReady ? cards.get(canvas) : undefined;
    }

    function rotate(card: Card, yaw: number, pitch: number) {
      card.yaw = THREE.MathUtils.euclideanModulo(card.yaw + card.hoverOffset + yaw, Math.PI * 2);
      card.pitch = THREE.MathUtils.clamp(card.pitch + card.hoverOffset * 0.22 + pitch, -0.8, 0.8);
      card.hoverOffset = 0;
      card.hoverPaused = !motion.matches;
      dirty.add(card);
      schedule();
    }

    function startDrag(event: PointerEvent) {
      if (!event.isPrimary || event.button !== 0 || drag) return;
      suppressClick = undefined;
      if (!(event.target instanceof HTMLCanvasElement)) return;
      const card = findReadyCard(event.target);
      if (!card) return;
      card.canvas.setPointerCapture(event.pointerId);
      card.canvas.dataset.dragging = "true";
      drag = { card, pointerId: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
      rotate(card, 0, 0);
    }

    function moveDrag(event: PointerEvent) {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 5) return;
      drag.moved = true;
      drag.x = event.clientX;
      drag.y = event.clientY;
      rotate(drag.card, dx * yawPerPixel, dy * 0.01);
    }

    function clearDrag() {
      if (!drag) return;
      const { card, pointerId } = drag;
      drag = undefined;
      delete card.canvas.dataset.dragging;
      if (card.canvas.hasPointerCapture(pointerId)) card.canvas.releasePointerCapture(pointerId);
    }

    function endDrag(event: PointerEvent) {
      if (!drag || event.pointerId !== drag.pointerId) return;
      if (event.type === "pointerup" && drag.moved) suppressClick = drag.card;
      clearDrag();
      schedule();
    }

    function preventDragNavigation(event: MouseEvent) {
      if (event.detail === 0) return;
      if (suppressClick && findReadyCard(event.target) === suppressClick) {
        event.preventDefault();
        event.stopPropagation();
      }
      suppressClick = undefined;
    }

    function preventNativeDrag(event: DragEvent) {
      if (drag) event.preventDefault();
    }

    function rotateWithKeyboard(event: KeyboardEvent) {
      const card = findReadyCard(event.target);
      if (!card || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      switch (event.key) {
        case "ArrowLeft": rotate(card, -keyboardStep, 0); break;
        case "ArrowRight": rotate(card, keyboardStep, 0); break;
        case "ArrowUp": rotate(card, 0, -keyboardStep / 2); break;
        case "ArrowDown": rotate(card, 0, keyboardStep / 2); break;
        default: return;
      }
      event.preventDefault();
    }

    function syncCards() {
      const current = new Set(grid.querySelectorAll<HTMLCanvasElement>(canvasSelector));
      for (const [canvas, card] of cards) {
        if (current.has(canvas)) continue;
        if (card === previousActive) previousActive = undefined;
        if (card === drag?.card) clearDrag();
        if (card === suppressClick) suppressClick = undefined;
        dirty.delete(card);
        intersection.unobserve(canvas);
        resize.unobserve(canvas);
        card.model?.dispose();
        cards.delete(canvas);
      }
      for (const canvas of current) {
        if (cards.has(canvas)) continue;
        cards.set(canvas, { canvas, visible: false, yaw: 0, pitch: 0, hoverOffset: 0, hoverPaused: false });
        intersection.observe(canvas);
        resize.observe(canvas);
      }
    }

    function clearModelAvailability() {
      clearDrag();
      suppressClick = undefined;
      for (const { canvas } of cards.values()) {
        if (!canvas.dataset.modelReady) continue;
        delete canvas.dataset.modelReady;
        canvas.closest("a")?.removeAttribute("aria-describedby");
      }
    }

    function onContextLost(event: Event) {
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(frame);
      frame = 0;
      clearModelAvailability();
    }

    function onContextRestored() {
      environment?.dispose();
      environment = undefined;
      scene.environment = null;
      lost = false;
      refresh();
    }

    const changes = new MutationObserver(syncCards);
    changes.observe(grid, { childList: true });
    const theme = new MutationObserver(refresh);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const interactionEvents = ["pointerover", "pointerout", "focusin", "focusout"] as const;
    const dragEndEvents = ["pointerup", "pointercancel", "lostpointercapture"] as const;
    interactionEvents.forEach((event) => grid.addEventListener(event, schedule));
    dragEndEvents.forEach((event) => grid.addEventListener(event, endDrag));
    grid.addEventListener("pointerdown", startDrag);
    grid.addEventListener("pointermove", moveDrag);
    grid.addEventListener("click", preventDragNavigation, true);
    grid.addEventListener("dragstart", preventNativeDrag);
    grid.addEventListener("keydown", rotateWithKeyboard);
    motion.addEventListener("change", refresh);
    document.addEventListener("visibilitychange", refresh);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);
    syncCards();

    return () => {
      cancelAnimationFrame(frame);
      interactionEvents.forEach((event) => grid.removeEventListener(event, schedule));
      dragEndEvents.forEach((event) => grid.removeEventListener(event, endDrag));
      grid.removeEventListener("pointerdown", startDrag);
      grid.removeEventListener("pointermove", moveDrag);
      grid.removeEventListener("click", preventDragNavigation, true);
      grid.removeEventListener("dragstart", preventNativeDrag);
      grid.removeEventListener("keydown", rotateWithKeyboard);
      motion.removeEventListener("change", refresh);
      document.removeEventListener("visibilitychange", refresh);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
      intersection.disconnect();
      resize.disconnect();
      changes.disconnect();
      theme.disconnect();
      clearModelAvailability();
      for (const { model } of cards.values()) model?.dispose();
      environment?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [gridRef, buildModel, instructionsId, lighting]);

  return null;
}
