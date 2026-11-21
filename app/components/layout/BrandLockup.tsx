import { brand } from "../../content/shared/brand";
import type { CSSProperties, ReactNode } from "react";

function letterSpans(text: string) {
  return Array.from(text, (letter, index) => (
    <span key={index} style={{ "--letter-index": index } as CSSProperties}>{letter}</span>
  ));
}

export default function BrandLockup({ mark, animateText = false }: { mark?: ReactNode; animateText?: boolean }) {
  return (
    <span className="brand-lockup">
      {mark ?? <span className="brand-lockup-mark" aria-hidden="true" />}
      <span className="brand-lockup-type">
        <span className="brand-lockup-name">{animateText ? letterSpans(brand.name) : brand.name}</span>
        <span className="brand-lockup-tagline">{animateText ? letterSpans(brand.tagline) : brand.tagline}</span>
      </span>
    </span>
  );
}
