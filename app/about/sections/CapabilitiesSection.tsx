import Link from "next/link";
import GlowHoverCard from "../../components/ui/GlowHoverCard";
import { CAPABILITIES } from "./about-data";
import {
  aboutCapabilityBody,
  aboutCapabilityLink,
  aboutCapabilityTitle,
  aboutSectionEyebrow,
  aboutSectionSubtitle,
  aboutSectionTitle,
} from "./about-styles";

export default function CapabilitiesSection() {
  return (
    <section className="relative border-t border-line py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <p className={aboutSectionEyebrow}>What we do</p>
          <h2 className={aboutSectionTitle}>Capabilities across the full product stack.</h2>
          <p className={aboutSectionSubtitle}>
            From first wireframe to production deployment — we cover the disciplines modern
            digital products need to win.
          </p>
        </div>

        <div className="grid gap-5 overflow-visible p-1 sm:grid-cols-2">
          {CAPABILITIES.map((cap) => (
            <GlowHoverCard key={cap.title} as={Link} href={cap.href} className="block rounded-3xl p-6 sm:p-7">
              <h3 className={aboutCapabilityTitle}>{cap.title}</h3>
              <p className={aboutCapabilityBody}>{cap.body}</p>
              <span className={aboutCapabilityLink}>Explore service →</span>
            </GlowHoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
