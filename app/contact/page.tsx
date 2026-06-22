import type { Metadata } from "next";
import ContactForm from "../components/sections/contact/ContactForm";
import PageAmbientGlow from "../components/layout/PageAmbientGlow";
import GlowHoverCard from "../components/ui/GlowHoverCard";
import {
  glowHoverCardBullet,
  glowHoverCardLink,
  glowHoverCardText,
  glowHoverCardTitle,
} from "../components/ui/glow-card-styles";
import { footer } from "../content/layout/footer";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "Contact Us — Canopy Arc",
  description:
    "Talk to the Canopy Arc team. Tell us what you want to build — we read every message.",
};

export default function ContactPage() {
  return (
    <div className={`${tw.pageShell} relative overflow-hidden`}>
      <PageAmbientGlow />

      <section className="relative">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            Contact Us
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">
            Let&apos;s build something{" "}
            <span className={tw.gradientText}>amazing</span> together.
          </h1>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">
            Share a quick overview of your project. We&apos;ll respond with next
            steps, timeline, and the right engagement model.
          </p>
        </div>
      </section>

      <section className="relative mx-auto mt-12 grid max-w-350 gap-6 px-6 sm:mt-14 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div className="lg:col-span-7">
          <ContactForm />
          <div id="book" className="sr-only">
            Book a Call
          </div>
        </div>

        <aside className="space-y-5 lg:col-span-5">
          <GlowHoverCard className="p-6 sm:p-7">
            <h2 className={glowHoverCardTitle}>Contact Details</h2>
            <div className={`${glowHoverCardText} mt-5 space-y-3`}>
              <p className="whitespace-pre-line">{footer.contact.address}</p>
              <a className={glowHoverCardLink} href={`mailto:${footer.contact.email}`}>
                {footer.contact.email}
              </a>
              <a
                className={glowHoverCardLink}
                href={`tel:${footer.contact.phone.replace(/[^+0-9]/g, "")}`}
              >
                {footer.contact.phone}
              </a>
              <p>{footer.contact.hours}</p>
            </div>
          </GlowHoverCard>

          <GlowHoverCard className="p-6 sm:p-7">
            <h2 className={glowHoverCardTitle}>What happens next?</h2>
            <ul className={`${glowHoverCardText} mt-4 space-y-3`}>
              {[
                "We review your message and scope the requirements.",
                "We schedule a quick call to align on goals and constraints.",
                "You get a proposal with timeline, milestones, and pricing.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className={glowHoverCardBullet} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </GlowHoverCard>
        </aside>
      </section>
    </div>
  );
}
