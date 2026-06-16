import Link from "next/link";
import { siteData } from "../../../content/site-data";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group"
      aria-label={`${siteData.brand.name} home`}
    >
      <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-visible transition-transform group-hover:scale-105">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/canopy-arc-mark.png"
          alt=""
          width={56}
          height={56}
          className=" h-[130%] w-[130%] max-w-none object-contain"
        />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-sans text-base sm:text-lg font-semibold tracking-tight leading-none text-foreground">
          {siteData.brand.name}
        </span>
        <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.18em] uppercase text-muted leading-none">
          {siteData.brand.tagline}
        </span>
      </span>
    </Link>
  );
}
