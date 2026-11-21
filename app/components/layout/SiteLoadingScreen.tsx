import type { CSSProperties } from "react";
import BrandLockup from "./BrandLockup";
import { siteRevealDuration } from "./site-loading";

export default function SiteLoadingScreen() {
  return (
    <div
      className="site-loading-screen"
      role="status"
      aria-label="Loading Canopy Arc"
      style={{ "--site-reveal-duration": `${siteRevealDuration}ms` } as CSSProperties}
    >
      <div className="site-loading-scene" aria-hidden="true">
        <div className="story-studio" />
        <div className="site-loading-flare" />
        <div className="site-loading-orbits">
          <span />
          <span />
          <span />
        </div>
        <div className="site-loading-content">
          <BrandLockup animateText mark={<span className="brand-lockup-mark site-loading-mark" />} />
        </div>
      </div>
    </div>
  );
}
