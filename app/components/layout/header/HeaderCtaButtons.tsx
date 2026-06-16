import Link from "next/link";
import { siteData } from "../../../content/site-data";

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
        className="btn-header btn-header-ghost no-underline"
      >
        {siteData.nav.ctaSecondary.label}
      </Link>
      <Link
        href={siteData.nav.ctaPrimary.href}
        className="btn-header btn-header-primary no-underline"
      >
        {siteData.nav.ctaPrimary.label} →
      </Link>
    </div>
  );
}
