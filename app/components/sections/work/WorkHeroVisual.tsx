"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useState, type CSSProperties, type ReactNode } from "react";
import { useTheme } from "../../layout/ThemeProvider";
import { useModelOrbit } from "../../three/useModelOrbit";

const Scene = dynamic(() => import("./WorkHeroScene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function WorkHeroVisual() {
  const theme = useTheme();
  const { pose, dragging, controls } = useModelOrbit({ yaw: -0.16, pitch: -0.10 });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  const live = ready && !failed;

  return (
    <div className="work-hero-model" data-live={live || undefined}>
      <div className="work-hero-viewer" role="group" tabIndex={0} aria-label="Interactive 3D model of layered glass project windows"
        aria-describedby="work-hero-model-instructions" data-dragging={dragging || undefined}
        {...controls}>
        <div className="work-hero-model-fallback" aria-hidden="true" style={{
          "--model-yaw": `${pose.yaw}rad`, "--model-pitch": `${pose.pitch}rad`,
        } as CSSProperties}>
          <div className="work-hero-model-stack">
            <span /><span /><span />
          </div>
        </div>
        <div className="work-hero-model-canvas" aria-hidden="true">
          {!failed && (
            <SceneBoundary onFailure={onFailure}>
              <Scene dark={theme === "dark"} pose={pose} dragging={dragging} onReady={onReady} onFailure={onFailure} />
            </SceneBoundary>
          )}
        </div>
      </div>
      <p className="sr-only" id="work-hero-model-instructions">Drag or use the arrow keys to rotate the model.</p>
    </div>
  );
}
