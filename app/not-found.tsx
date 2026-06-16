import Button from "./components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden bg-background text-foreground px-6">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none mask-fade-bottom" />
      <div className="brand-orb brand-orb-warm -top-32 -left-32 h-96 w-96" />
      <div className="brand-orb brand-orb-trust -bottom-32 -right-32 h-96 w-96" />

      <div className="relative max-w-2xl text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">
          404 · page not found
        </p>
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight">
          A quiet, <span className="gradient-text">empty</span> page.
        </h1>
        <p className="mt-8 text-base md:text-lg text-muted leading-relaxed max-w-md mx-auto">
          The page you&apos;re looking for either moved, was renamed, or never
          existed. The rest of Canopy Arc is right where you left it.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/">
            Back to home
          </Button>
          <Button href="/contact" variant="ghost">
            Tell us what&apos;s missing
          </Button>
        </div>
      </div>
    </section>
  );
}
