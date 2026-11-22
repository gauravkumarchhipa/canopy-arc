"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useState, type ReactNode } from "react";
import { useTheme } from "../../layout/ThemeProvider";
import { useModelOrbit } from "../../three/useModelOrbit";
import ContactWave from "./ContactWave";

const Scene = dynamic(() => import("./ContactHeroScene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function ContactHeroVisual() {
  const theme = useTheme();
  const { pose, dragging, controls } = useModelOrbit({ yaw: -0.28, pitch: -0.15 });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  const live = ready && !failed;

  return (
    <div
      className="contact-hero-model"
      data-live={live || undefined}
      data-dragging={live && dragging || undefined}
      role={live ? "group" : undefined}
      tabIndex={live ? 0 : undefined}
      aria-label={live ? "Interactive 3D model of a glass envelope surrounded by signal rings" : undefined}
      aria-describedby={live ? "contact-model-instructions" : undefined}
      {...(live ? controls : {})}
    >
      {failed ? <ContactWave /> : (
        <div className="contact-model-canvas" aria-hidden="true">
          <SceneBoundary onFailure={onFailure}>
            <Scene dark={theme === "dark"} pose={pose} dragging={dragging} onReady={onReady} onFailure={onFailure} />
          </SceneBoundary>
        </div>
      )}
      {live && <span id="contact-model-instructions" className="sr-only">Drag or use the arrow keys to rotate the model.</span>}
    </div>
  );
}
