"use client";

import { useEffect, useRef } from "react";
import type { NavbarMarkScene } from "./navbar-mark-scene";

export default function NavbarMark() {
  const sceneHost = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = sceneHost.current;
    if (!host) return;
    let scene: NavbarMarkScene | undefined;
    let loading = false;
    let disposed = false;

    // The desktop and mobile logos share this component. Only render the visible one.
    const resize = () => {
      if (host.clientWidth === 0) {
        scene?.dispose();
        scene = undefined;
      } else if (scene) {
        scene.resize();
      } else if (!loading) {
        loading = true;
        void import("./navbar-mark-scene").then(({ mountNavbarMark }) => {
          if (!disposed && host.clientWidth > 0) scene = mountNavbarMark(host);
        }).catch(() => {
          // The static mark is already visible if WebGL is unavailable.
        }).finally(() => { loading = false; });
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    return () => {
      disposed = true;
      observer.disconnect();
      scene?.dispose();
    };
  }, []);

  return (
    <span className="navbar-mark" aria-hidden="true">
      <span className="brand-lockup-mark" />
      <span ref={sceneHost} className="navbar-mark-scene" />
    </span>
  );
}
