import Reveal from "../../components/Reveal";
import Eyebrow from "../../components/ui/Eyebrow";

export default function WhySection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-5">The why</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <Reveal staggerChildren stagger={0.15}>
              <p className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight">
                Healthcare too often only listens when something is already
                wrong.
              </p>
              <p className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight mt-3">
                Families guess. Doctors react. Nothing remembers.
              </p>
              <p className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight mt-8 text-foreground/85">
                SAHAI is a continuous, real-time layer of health understanding
                — quietly building memory, gently catching what matters, and
                only ever interrupting when it should.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
