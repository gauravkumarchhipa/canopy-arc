import Heading from "./components/ui/Heading";
import Button from "./components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden px-6">
      <div className="relative max-w-2xl text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">
          404 · page not found
        </p>
        <Heading level={1} className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight">
          A quiet, <span className="text-muted">empty</span> page.
        </Heading>
        <p className="mt-8 text-base md:text-lg text-muted leading-relaxed max-w-md mx-auto">
          The page you&apos;re looking for either moved, was renamed, or never
          existed. The rest of Canopy Arc is right where you left it.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center">
          <Button variant="header-primary" href="/">
            Back to home
          </Button>
          <Button variant="header-ghost" href="/contact">
            Tell us what&apos;s missing
          </Button>
        </div>
      </div>
    </section>
  );
}
