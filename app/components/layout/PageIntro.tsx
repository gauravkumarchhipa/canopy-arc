import type { ReactNode } from "react";
import Eyebrow from "../ui/Eyebrow";
import EyebrowPill from "../ui/EyebrowPill";
import { tw } from "../../lib/tw";

type Props = {
  eyebrow: string;
  title: string;
  /** Second line with blue gradient — matches home hero accent */
  titleAccent?: string;
  subtitle?: string;
  /** Pill badge with icon — matches home hero eyebrow */
  eyebrowPill?: boolean;
  children?: ReactNode;
};

export default function PageIntro({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  eyebrowPill = false,
  children,
}: Props) {
  return (
    <section className="relative">
      <div className={tw.pageIntro}>
        {eyebrowPill ? (
          <EyebrowPill>{eyebrow}</EyebrowPill>
        ) : (
          <Eyebrow className="block leading-relaxed">{eyebrow}</Eyebrow>
        )}
        <h1
          className={`font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight ${
            titleAccent ? "" : "whitespace-pre-line"
          } ${eyebrowPill ? "mt-7" : "mt-5"}`}
        >
          {titleAccent ? (
            <>
              {title}
              <br />
              <span className={tw.gradientText}>{titleAccent}</span>
            </>
          ) : (
            title
          )}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">{subtitle}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
