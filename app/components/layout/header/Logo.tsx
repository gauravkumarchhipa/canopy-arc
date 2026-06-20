import Link from "next/link";
import ThemeAwareMark from "../../ThemeAwareMark";
import { brand } from "../../../content/shared/brand";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3.5 sm:gap-4 group"
      aria-label={`${brand.name} home`}
    >
      <span className="relative inline-flex h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] shrink-0 items-center justify-center overflow-visible transition-transform group-hover:scale-105">
        <ThemeAwareMark
          alt="Canopy Arc"
          width={72}
          height={72}
          className="h-[130%] w-[130%] max-w-none object-contain"
        />
      </span>
      <span className="flex flex-col gap-2 sm:gap-2.5 md:hidden lg:flex">
        <span className="font-sans text-lg sm:text-xl font-semibold tracking-tight leading-none text-foreground">
          {brand.name}
        </span>
        <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase text-muted leading-snug">
          {brand.tagline}
        </span>
      </span>
    </Link>
  );
}
