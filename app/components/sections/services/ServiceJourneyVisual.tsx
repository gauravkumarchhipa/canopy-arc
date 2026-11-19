"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useState, type ReactNode } from "react";
import { useTheme } from "../../layout/ThemeProvider";
import { useModelOrbit } from "../../three/useModelOrbit";

const Scene = dynamic(() => import("./ServiceJourneyScene"), { ssr: false });

class JourneySceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function ServiceJourneyVisual() {
  const theme = useTheme();
  const { pose, dragging, controls } = useModelOrbit({ yaw: -0.11, pitch: -0.06 });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  const live = ready && !failed;

  return (
    <figure className="services-journey-visual" data-live={live || undefined}
      data-dragging={dragging || undefined} tabIndex={live ? 0 : undefined}
      aria-describedby={live ? "services-journey-orbit-instructions" : undefined}
      {...(live ? controls : {})}>
      <div className="services-journey-canvas" aria-hidden="true">
        {!failed && (
          <JourneySceneBoundary onFailure={onFailure}>
            <Scene dark={theme === "dark"} pose={pose} dragging={dragging} onReady={onReady} onFailure={onFailure} />
          </JourneySceneBoundary>
        )}
      </div>
      <span className="sr-only" id="services-journey-orbit-instructions">Drag or use the arrow keys to rotate the model.</span>
      <figcaption className="sr-only">
        Six glass panels climb a ribbon of light, representing the journey from idea and design through development, intelligence, security, and launch.
      </figcaption>
    </figure>
  );
}
