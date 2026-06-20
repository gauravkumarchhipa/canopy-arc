import type { Metadata } from "next";
import ContactForm from "../components/sections/contact/ContactForm";
import { footer } from "../content/layout/footer";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "Contact Us — Canopy Arc",
  description:
    "Talk to the Canopy Arc team. Tell us what you want to build — we read every message.",
};

export default function ContactPage() {
  return (
    <div className={tw.pageShell}>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted">
            Contact Us
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.05] tracking-tight">
            Let&apos;s build something{" "}
            <span className="bg-[image:var(--grad)] bg-clip-text text-transparent">amazing</span> together.
          </h1>
          <p className="mt-5 text-muted max-w-3xl leading-relaxed">
            Share a quick overview of your project. We’ll respond with next
            steps, timeline, and the right engagement model.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-350 px-6 lg:px-10 mt-12 sm:mt-14 grid lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-7">
          <ContactForm />
          <div id="book" className="sr-only">
            Book a Call
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-5">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <h2 className="text-sm font-semibold text-foreground/90">
              Contact Details
            </h2>
            <div className="mt-5 space-y-3 text-sm text-muted">
              <p className="whitespace-pre-line">{footer.contact.address}</p>
              <a className="block hover:text-foreground transition-colors" href={`mailto:${footer.contact.email}`}>
                {footer.contact.email}
              </a>
              <a className="block hover:text-foreground transition-colors" href={`tel:${footer.contact.phone.replace(/[^+0-9]/g, "")}`}>
                {footer.contact.phone}
              </a>
              <p>{footer.contact.hours}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <h2 className="text-sm font-semibold text-foreground/90">
              What happens next?
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {[
                "We review your message and scope the requirements.",
                "We schedule a quick call to align on goals and constraints.",
                "You get a proposal with timeline, milestones, and pricing."
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
