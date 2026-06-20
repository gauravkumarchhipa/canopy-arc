import Link from "next/link";
import { nav } from "../../../content/shared/nav";
import { tw } from "../../../lib/tw";

type Props = {
  className?: string;
  stacked?: boolean;
};

export default function HeaderCtaButtons({ className = "", stacked = false }: Props) {
  return (
    <div
      className={`${stacked ? "flex flex-col gap-3 w-full" : "flex items-center gap-3"} ${className}`.trim()}
    >
      <Link
        href={nav.ctaSecondary.href}
        className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}
      >
        {nav.ctaSecondary.label}
      </Link>
      <Link
        href={nav.ctaPrimary.href}
        className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}
      >
        {nav.ctaPrimary.label} →
      </Link>
    </div>
  );
}
