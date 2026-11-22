import type { ComponentProps } from "react";

export default function StudioHero({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={className ? `studio-hero ${className}` : "studio-hero"}>
      <div className="story-studio" aria-hidden="true" />
      {children}
    </section>
  );
}
