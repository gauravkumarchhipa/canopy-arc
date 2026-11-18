"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

export type ModelPose = { yaw: number; pitch: number };

const step = Math.PI / 8;

export function useModelOrbit(initialPose: ModelPose) {
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const [pose, setPose] = useState(initialPose);
  const [dragging, setDragging] = useState(false);

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
    if (previous?.id !== event.pointerId) return;
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
    pose,
    dragging,
    controls: {
      onPointerDown: grab,
      onPointerMove: move,
      onPointerUp: release,
      onPointerCancel: release,
      onLostPointerCapture: release,
      onKeyDown: moveWithKeyboard,
    },
  };
}
