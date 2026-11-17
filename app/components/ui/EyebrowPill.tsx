import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function EyebrowPill({ children, className = "" }: Props) {
  return (
    <div
      className={`editorial-label ${className}`.trim()}
    >
      <span className="small-square" aria-hidden />
      <span className="tracking-[0.08em] uppercase">{children}</span>
    </div>
  );
}
