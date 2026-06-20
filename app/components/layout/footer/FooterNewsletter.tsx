import Link from "next/link";
import { nav } from "../../../content/shared/nav";
import { IconHeadset } from "./FooterIcons";
import NewsletterFormLazy from "./NewsletterFormLazy";

export default function FooterNewsletter() {
  return (
    <div className="min-w-0 sm:col-span-2 lg:col-span-1">
      <div
        className="mb-[0.85rem] h-[3px] w-8 rounded-full bg-[linear-gradient(90deg,#3b82f6,#22d3ee)]"
        aria-hidden
      />
      <h4 className="text-[0.95rem] font-semibold tracking-tight text-foreground">
        Stay Updated
      </h4>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Subscribe to our newsletter and get the latest updates, insights and
        exclusive offers.
      </p>
      <NewsletterFormLazy />

      <div className="mt-8 flex gap-[0.85rem] rounded-2xl border border-accent/18 bg-accent/8 p-4 px-[1.1rem]">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/14 text-accent">
          <IconHeadset />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Need Support?</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            We&apos;re here to help 24/7. Get in touch!
          </p>
          <Link
            href={nav.ctaPrimary.href}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
          >
            Contact Support
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
