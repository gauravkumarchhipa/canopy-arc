import Button from "./components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden bg-background text-foreground px-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px] opacity-30 pointer-events-none [mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute rounded-full blur-[80px] opacity-55 bg-[radial-gradient(closest-side,rgba(242,153,74,0.55),transparent_70%)] [html[data-theme=dark]_&]:bg-[radial-gradient(closest-side,rgba(255,176,104,0.5),transparent_70%)] -top-32 -left-32 h-96 w-96" />
      <div className="pointer-events-none absolute rounded-full blur-[80px] opacity-55 bg-[radial-gradient(closest-side,rgba(43,179,163,0.45),transparent_70%)] [html[data-theme=dark]_&]:bg-[radial-gradient(closest-side,rgba(78,209,193,0.4),transparent_70%)] -bottom-32 -right-32 h-96 w-96" />

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
