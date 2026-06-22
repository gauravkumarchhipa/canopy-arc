import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import {
  glowHoverCard,
  glowHoverCardGradient,
  glowHoverCardPattern,
} from "./glow-card-styles";

type GlowHoverCardProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function GlowHoverCard<T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...props
}: GlowHoverCardProps<T>) {
  const Tag = as ?? "div";

  return (
    <Tag className={`${glowHoverCard} ${className}`.trim()} {...props}>
      <div className={glowHoverCardGradient} aria-hidden />
      <div className={glowHoverCardPattern} aria-hidden />
      {children}
    </Tag>
  );
}
