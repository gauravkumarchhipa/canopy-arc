import type { ReactNode } from "react";
import Eyebrow from "../ui/Eyebrow";
import { tw } from "../../lib/tw";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function PageIntro({ eyebrow, title, subtitle, children }: Props) {
  return (
    <section className="relative">
      <div className={tw.pageIntro}>
        <Eyebrow className="block leading-relaxed">{eyebrow}</Eyebrow>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight whitespace-pre-line">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">{subtitle}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
