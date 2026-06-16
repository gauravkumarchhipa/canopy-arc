import Link from "next/link";
import Reveal from "../../components/Reveal";
import RevealText from "../../components/RevealText";
import Eyebrow from "../../components/ui/Eyebrow";
import { FAQ } from "./pricing-data";

export default function MiniFaqSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Eyebrow className="mb-5">Pricing FAQ</Eyebrow>
          <RevealText
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight"
          >
            {`Common\nquestions.`}
          </RevealText>
        </div>
        <div className="lg:col-span-8">
          <Reveal staggerChildren stagger={0.08}>
            <div className="divide-y divide-line">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="font-display text-xl md:text-2xl tracking-tight">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-base text-muted leading-relaxed max-w-2xl">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <p className="mt-8 text-sm text-muted">
              More questions? See the full{" "}
              <Link href="/faq" className="text-accent">
                FAQ
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-accent">
                ask us
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
