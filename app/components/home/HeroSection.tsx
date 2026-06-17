import RevealText from '../RevealText'
import Reveal from '../Reveal'
import Button from '../ui/Button'
const HeroSection = () => {
    return (
        <section className="relative min-h-svh overflow-hidden text-foreground">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-size-[64px_64px] opacity-30 pointer-events-none" />

            {/* gradient lets the persistent canvas show through on the right */}
            <div className="absolute inset-y-0 left-0 right-0 lg:right-[42%] bg-linear-to-r from-background via-background/85 to-transparent pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-350 px-6 lg:px-10 pt-28 sm:pt-36 lg:pt-44 pb-36 sm:pb-32 lg:pb-32 grid lg:grid-cols-12 gap-10 items-center min-h-svh">
                <div className="lg:col-span-7 xl:col-span-6">
                    <div className="flex items-start sm:items-center gap-3 mb-8">
                        <span className="relative flex h-2 w-2 mt-1.5 sm:mt-0 shrink-0">
                            <span className="absolute inline-flex h-full w-full rounded-full status-dot live-pulse" />
                            <span className="relative inline-flex h-2 w-2 rounded-full status-dot" />
                        </span>
                        <span className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-muted">
                            Voice-first health · live across India
                        </span>
                    </div>

                    <RevealText
                        as="h1"
                        className="font-display text-5xl sm:text-6xl md:text-[10vw] lg:text-[6.5vw] xl:text-[5.5vw] leading-[0.95] tracking-tight wrap-break-word"
                    >
                        {`Care that listens.\nMemory that lasts.\nFamilies that breathe.`}
                    </RevealText>

                    <Reveal delay={0.4} y={24}>
                        <p className="mt-8 max-w-lg text-base md:text-lg text-muted leading-relaxed">
                            SAHAI is a voice-first companion for elders and the people who
                            love them — building a continuous, real-time layer of health
                            understanding so families can stop guessing and start being
                            present.
                        </p>
                    </Reveal>

                    <Reveal delay={0.6}>
                        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Button href="/contact">
                                <span>Download SAHAI</span>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M5 12h14M13 5l7 7-7 7" />
                                </svg>
                            </Button>
                            <Button href="/how-it-works" variant="ghost">
                                See how it works
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </div>

            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 sm:gap-3 text-muted text-[10px] sm:text-xs tracking-[0.3em] uppercase pointer-events-none">
                <span>scroll</span>
                <span className="relative flex h-9 w-4.5 sm:h-10 sm:w-5 items-start justify-center rounded-full border border-muted/50">
                    <span className="scroll-dot mt-1.5 block h-1.5 w-1.5 rounded-full bg-foreground" />
                </span>
            </div>
        </section>
    )
}

export default HeroSection
