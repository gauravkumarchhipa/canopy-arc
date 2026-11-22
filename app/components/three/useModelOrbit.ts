"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

export type ModelPose = { yaw: number; pitch: number };

const step = Math.PI / 8;
const restHover = { yaw: 0, pitch: 0 };
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function useModelHover() {
  const [hoverPose, setHoverPose] = useState(restHover);

  useEffect(() => {
    const motion = window.matchMedia(reducedMotionQuery);
    const reset = () => { if (motion.matches) setHoverPose(restHover); };
    motion.addEventListener("change", reset);
    return () => motion.removeEventListener("change", reset);
  }, []);

  function moveHover(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || event.buttons !== 0 || window.matchMedia(reducedMotionQuery).matches) return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    if (!width || !height) return;
    const x = Math.max(-1, Math.min(1, (event.clientX - left) / width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - top) / height * 2 - 1));
    setHoverPose({ yaw: x * 0.14, pitch: y * 0.08 });
  }

  function resetHover() {
    setHoverPose(restHover);
  }

  return { hoverPose, moveHover, resetHover };
}

export function useModelOrbit(initialPose: ModelPose) {
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const [pose, setPose] = useState(initialPose);
  const [dragging, setDragging] = useState(false);
  const { hoverPose, moveHover, resetHover } = useModelHover();

  function rotate(yaw: number, pitch: number) {
    setPose((current) => ({ yaw: current.yaw + yaw, pitch: Math.max(-0.65, Math.min(0.65, current.pitch + pitch)) }));
  }

  function grab(event: PointerEvent<HTMLElement>) {
    if (pointer.current || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    setDragging(true);
  }

  function move(event: PointerEvent<HTMLElement>) {
    const previous = pointer.current;
    if (!previous) {
      moveHover(event);
      return;
    }
    if (previous.id !== event.pointerId) return;
    rotate((event.clientX - previous.x) * 0.012, (event.clientY - previous.y) * 0.008);
    pointer.current = { ...previous, x: event.clientX, y: event.clientY };
  }

  function release(event: PointerEvent<HTMLElement>) {
    if (pointer.current?.id !== event.pointerId) return;
    pointer.current = null;
    setDragging(false);
  }

  function moveWithKeyboard(event: KeyboardEvent<HTMLElement>) {
    switch (event.key) {
      case "ArrowLeft": rotate(-step, 0); break;
      case "ArrowRight": rotate(step, 0); break;
      case "ArrowUp": rotate(0, -step / 2); break;
      case "ArrowDown": rotate(0, step / 2); break;
      default: return;
    }
    event.preventDefault();
  }

  return {
    pose: {
      yaw: pose.yaw + hoverPose.yaw,
      pitch: Math.max(-0.65, Math.min(0.65, pose.pitch + hoverPose.pitch)),
    },
    dragging,
    controls: {
      onPointerDown: grab,
      onPointerMove: move,
      onPointerLeave: resetHover,
      onPointerUp: release,
      onPointerCancel: release,
      onLostPointerCapture: release,
      onKeyDown: moveWithKeyboard,
    },
  };
}
