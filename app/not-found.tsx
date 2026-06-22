import Link from "next/link";
import { tw } from "./lib/tw";

export default function NotFound() {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden px-6">
      <div className="relative max-w-2xl text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">
          404 · page not found
        </p>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight">
          A quiet, <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">empty</span> page.
        </h1>
        <p className="mt-8 text-base md:text-lg text-muted leading-relaxed max-w-md mx-auto">
          The page you&apos;re looking for either moved, was renamed, or never
          existed. The rest of Canopy Arc is right where you left it.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center">
          <Link href="/" className={`${tw.headerBtnBase} ${tw.headerBtnPrimary}`}>
            Back to home
          </Link>
          <Link href="/contact" className={`${tw.headerBtnBase} ${tw.headerBtnGhost}`}>
            Tell us what&apos;s missing
          </Link>
        </div>
      </div>
    </section>
  );
}
