import type { ReactNode } from "react";
import ArrowIcon from "./ArrowIcon";

type Padding = "sm" | "md" | "lg";

const PADDING_CLASS: Record<Padding, string> = {
  sm: "p-5 sm:p-6",
  md: "p-6 md:p-8",
  lg: "p-6 sm:p-8 md:p-12",
};

type Props = {
  children: ReactNode;
  className?: string;
  padding?: Padding;
  arrow?: boolean;
  /** Override the article element. Default `article`. */
  as?: "article" | "div";
  /** Disable the default hover lift. */
  noHover?: boolean;
};

export default function Card({
  children,
  className,
  padding = "md",
  arrow = false,
  as = "article",
  noHover = false,
}: Props) {
  const Element = as;
  const base =
    "bg-background border border-line rounded-2xl group transition-colors relative";
  const hover = noHover
    ? ""
    : " hover:bg-surface hover:border-line-strong";
  const cls = `${base}${hover} ${PADDING_CLASS[padding]}${
    className ? " " + className : ""
  }`;

  return (
    <Element className={cls} data-cursor="hover">
      {children}
      {arrow && (
        <span className="absolute right-4 top-4 md:right-5 md:top-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line-strong group-hover:border-accent group-hover:rotate-45 transition-all">
          <ArrowIcon size={12} />
        </span>
      )}
    </Element>
  );
}
