import Link from "next/link";
import { siteData } from "../../../content/site-data";
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
        href={siteData.nav.ctaSecondary.href}
        className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}
      >
        {siteData.nav.ctaSecondary.label}
      </Link>
      <Link
        href={siteData.nav.ctaPrimary.href}
        className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}
      >
        {siteData.nav.ctaPrimary.label} →
      </Link>
    </div>
  );
}
