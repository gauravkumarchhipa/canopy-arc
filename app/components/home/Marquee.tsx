const Marquee = () => {
    return (
        <section className="relative py-10 md:py-16 border-y border-line overflow-hidden">
            <div className="marquee-track font-display text-4xl sm:text-5xl md:text-7xl text-foreground/30">
                {Array.from({ length: 2 }).map((_, dup) => (
                    <div key={dup} className="flex items-center gap-10 sm:gap-16">
                        <span>voice</span>
                        <span className="text-foreground/10">●</span>
                        <span>memory</span>
                        <span className="text-foreground/10">●</span>
                        <span>reliability</span>
                        <span className="text-foreground/10">●</span>
                        <span>family</span>
                        <span className="text-foreground/10">●</span>
                        <span>care</span>
                        <span className="text-foreground/10">●</span>
                        <span>continuity</span>
                        <span className="text-foreground/10">●</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Marquee
