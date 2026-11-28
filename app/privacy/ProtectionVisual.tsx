"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useTheme } from "../components/layout/ThemeProvider";
import type { SceneMotion } from "../components/sections/home/StoryExperience";
import StorySceneBoundary from "../components/sections/home/StorySceneBoundary";
import { lastChapter } from "../components/sections/home/story-chapters";
import { useModelOrbit } from "../components/three/useModelOrbit";

const StoryScene = dynamic(() => import("../components/sections/home/StoryScene"), { ssr: false });
const restPose = { yaw: 0, pitch: 0 };

export default function ProtectionVisual({ poseIndex, children }: { poseIndex: number; children: ReactNode }) {
  const theme = useTheme();
  const motion = useRef<SceneMotion>({ progress: poseIndex / lastChapter, orbit: 0, pointerX: 0, pointerY: 0, darkTheme: theme === "dark" });
  const stage = useRef<HTMLDivElement>(null);
  const renderRequest = useRef<(() => void) | null>(null);
  const instructions = useId();
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { pose, dragging, controls } = useModelOrbit(restPose);
  const interactive = ready && !failed;

  const setRenderRequest = useCallback((request: (() => void) | null) => {
    renderRequest.current = request;
  }, []);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setStarted(true);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    motion.current.darkTheme = theme === "dark";
    motion.current.orbit = pose.yaw;
    // The shared camera subtracts pointerY when calculating its elevation.
    motion.current.pointerY = pose.pitch * -3;
    renderRequest.current?.();
  }, [pose.pitch, pose.yaw, theme]);

  return (
    <figure className="sculpture-visual privacy-protection">
      <div
        ref={stage}
        className="sculpture-stage"
        data-ready={interactive ? "" : undefined}
        data-dragging={dragging ? "" : undefined}
        role={interactive ? "group" : "img"}
        aria-label="A three-dimensional privacy shield formed by connected bronze lines and nodes"
        aria-describedby={interactive ? instructions : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...(interactive ? controls : {})}
      >
        {!interactive && children}
        {started && !failed && (
          <div className="sculpture-canvas" data-ready={interactive ? "" : undefined} aria-hidden="true">
            <StorySceneBoundary onFailure={handleFailure}>
              <StoryScene motion={motion} setRenderRequest={setRenderRequest} visible={visible} compact onReady={handleReady} onFailure={handleFailure} />
            </StorySceneBoundary>
          </div>
        )}
      </div>
      <figcaption id={instructions} className="sr-only">Drag the sculpture or use the arrow keys to rotate it.</figcaption>
    </figure>
  );
}
