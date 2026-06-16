import OrbField from "../../components/OrbField";
import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Card from "../../components/ui/Card";
import Eyebrow from "../../components/ui/Eyebrow";
import { CHANNELS } from "./how-it-works-data";

export default function ChannelsSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-background text-foreground border-t border-line">
      <OrbField className="absolute inset-0 -z-0 opacity-60" />
      <div className="absolute inset-0 -z-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <Eyebrow className="mb-5">Channels</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`Wherever the elder is,\nSAHAI meets them.`}
          </RevealText>
        </div>

        <Reveal staggerChildren stagger={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CHANNELS.map((c) => (
              <Card key={c.name} padding="md" arrow>
                <p className="font-display text-2xl md:text-3xl tracking-tight">
                  {c.name}
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {c.body}
                </p>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
