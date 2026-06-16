import Reveal from '../Reveal'
import RevealText from '../RevealText'
import Eyebrow from '../ui/Eyebrow'

const Impact = () => {
    return (
        <section className="relative py-12 sm:py-20 md:py-44">
            <div className="hidden md:block absolute inset-y-0 left-0 right-1/4 bg-linear-to-r from-background from-55% via-background/95 to-transparent pointer-events-none" />
            <div className="relative mx-auto max-w-350 px-6 lg:px-10">
                <div className="max-w-3xl mb-20">
                    <Eyebrow className="mb-5">The impact</Eyebrow>
                    <RevealText
                        as="h2"
                        className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight"
                    >
                        {`A shift from treatment\nto presence.`}
                    </RevealText>
                </div>

                <Reveal staggerChildren stagger={0.12}>
                    {[
                        {
                            tag: "For the dependent",
                            lines: [
                                "Always supported.",
                                "Not dependent on memory.",
                                "Safer daily life.",
                            ],
                        },
                        {
                            tag: "For the family",
                            lines: [
                                "Clarity instead of uncertainty.",
                                "Alerts only when needed.",
                                "Peace of mind.",
                            ],
                        },
                        {
                            tag: "For the system",
                            lines: [
                                "Earlier detection.",
                                "Better decisions.",
                                "From treatment → prevention.",
                            ],
                        },
                    ].map((b) => (
                        <div
                            key={b.tag}
                            className="grid md:grid-cols-12 gap-4 md:gap-10 py-8 md:py-12 border-t border-line"
                        >
                            <p className="md:col-span-3 text-xs tracking-[0.25em] uppercase text-muted">
                                {b.tag}
                            </p>
                            <div className="md:col-span-9">
                                {b.lines.map((line) => (
                                    <p
                                        key={line}
                                        className="font-display text-2xl sm:text-3xl md:text-5xl tracking-tight leading-tight text-foreground/90 wrap-break-word"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}

export default Impact
