import RevealText from '../RevealText'
import Reveal from '../Reveal'
import Card from '../ui/Card'
import Eyebrow from '../ui/Eyebrow'

const STATS = [
    { k: "3–5s", v: "voice → response" },
    { k: "0", v: "data ever overwritten" },
    { k: "10×", v: "tested critical flows" },
    { k: "Hi · En", v: "natively bilingual" },
];

const System = () => {
    return (
        <section className="relative py-12 sm:py-20 md:py-44 overflow-hidden text-foreground">
            <div className="absolute inset-0 z-0 bg-linear-to-b from-background/90 via-background/40 to-background/90 pointer-events-none" />

            <div className="relative mx-auto max-w-350 px-6 lg:px-10">
                <div className="max-w-2xl">
                    <Eyebrow className="mb-5">The system</Eyebrow>
                    <RevealText
                        as="h2"
                        className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight"
                    >
                        {`A real-time layer\nof understanding.`}
                    </RevealText>
                    <Reveal delay={0.2}>
                        <p className="mt-8 text-base md:text-lg text-muted leading-relaxed max-w-xl">
                            Voice, WhatsApp, app, and IVR — all flow into a single
                            append-only memory. Confirmed inputs become structure. Repeated
                            patterns become signal. Critical events trigger a chain that
                            must always work.
                        </p>
                    </Reveal>
                </div>

                <Reveal staggerChildren stagger={0.1}>
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATS.map((s) => (
                            <Card key={s.v} padding="md" arrow>
                                <p className="font-display text-4xl md:text-5xl tracking-tight bg-[image:var(--grad)] bg-clip-text text-transparent">
                                    {s.k}
                                </p>
                                <p className="mt-3 text-xs tracking-[0.2em] uppercase text-muted">
                                    {s.v}
                                </p>
                            </Card>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

export default System
