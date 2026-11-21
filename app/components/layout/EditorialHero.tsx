import type { ReactNode } from "react";
import Heading from "../ui/Heading";

type Props = { eyebrow: string; title: ReactNode; subtitle: string };

export default function EditorialHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <p className="text-xs tracking-[0.3em] uppercase text-muted">{eyebrow}</p>
        <Heading level={1} className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">
          {title}
        </Heading>
        <p className="mt-5 max-w-3xl leading-relaxed text-muted">{subtitle}</p>
      </div>
    </section>
  );
}
