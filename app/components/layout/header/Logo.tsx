import Link from "next/link";
import { siteData } from "../../../content/site-data";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group"
      aria-label={`${siteData.brand.name} home`}
    >
      <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center transition-transform group-hover:scale-105">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/canopy-arc-mark.png"
          alt=""
          width={40}
          height={40}
          className="h-full w-full object-contain drop-shadow-[0_8px_24px_rgba(59,130,246,0.4)]"
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
