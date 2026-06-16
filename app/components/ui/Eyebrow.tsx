import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className }: Props) {
  return (
    <p
      className={`text-xs tracking-[0.3em] uppercase text-muted${
        className ? " " + className : ""
      }`}
    >
      {children}
    </p>
  );
}
