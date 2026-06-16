import RevealText from '../RevealText'
import Reveal from '../Reveal'
import Button from '../ui/Button'

const CTA = () => {
    return (
        <section className="relative py-16 sm:py-24 md:py-44">
            {/* Solid backdrop so the glass card sits on a clean canvas — the mic
            on the far right edge stays visible but never bleeds into the card */}
            <div className="absolute inset-y-0 left-0 right-1/4 bg-linear-to-r from-background from-60% via-background/95 to-transparent pointer-events-none" />
            <div className="relative mx-auto max-w-300 px-6 lg:px-10">
                <div className="relative glass rounded-3xl p-6 sm:p-10 md:p-20 overflow-hidden bg-background/70">
                    <div className="brand-orb brand-orb-warm -top-40 -right-40 h-96 w-96" />
                    <div className="brand-orb brand-orb-trust -bottom-40 -left-40 h-96 w-96" />

                    <div className="relative">
                        <RevealText
                            as="h2"
                            className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-tight max-w-3xl wrap-break-word"
                        >
                            {`Bring SAHAI home\ntoday.`}
                        </RevealText>
                        <Reveal delay={0.2}>
                            <p className="mt-8 max-w-xl text-base md:text-lg text-muted leading-relaxed">
                                Set up your family in minutes. Add the elder, link family
                                members, log the first medicine — SAHAI takes it from there.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <Button href="/contact">
                                    Download SAHAI
                                </Button>
                                <Button href="/about" variant="ghost">
                                    Read the why
                                </Button>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTA
