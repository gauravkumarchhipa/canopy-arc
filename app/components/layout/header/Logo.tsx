import Link from "next/link";
import { siteData } from "../../../content/site-data";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group"
      aria-label={`${siteData.brand.name} home`}
    >
      <span className="relative inline-flex h-14 w-14 items-center justify-center translate-y-1 transition-transform group-hover:scale-105">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/canopy-arc-mark.svg"
          alt={siteData.brand.name}
          width={56}
          height={56}
          className="h-full w-full object-contain drop-shadow-[0_10px_28px_rgba(59,130,246,0.35)]"
        />
      </span>
      <span className="font-display text-2xl tracking-tight">
        {siteData.brand.name}
      </span>
    </Link>
  );
}
