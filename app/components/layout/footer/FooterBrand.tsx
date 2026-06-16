import Link from "next/link";
import ThemeAwareMark from "../../ThemeAwareMark";
import { siteData } from "../../../content/site-data";

export default function FooterBrand() {
  return (
    <div className="lg:col-span-5">
      <Link href="/" className="inline-flex items-center gap-3">
        <span className="inline-flex h-16 w-16 items-center justify-center translate-y-1.5">
          <ThemeAwareMark
            alt={siteData.brand.name}
            width={64}
            height={64}
            className="h-full w-full object-contain drop-shadow-[0_12px_34px_rgba(59,130,246,0.32)]"
          />
        </span>
        <span className="font-display text-3xl tracking-tight">
          {siteData.brand.name}
        </span>
      </Link>
      <p className="mt-6 max-w-md text-muted leading-relaxed text-[15px]">
        {siteData.footer.description}
      </p>

      <div className="mt-8 space-y-3 text-sm text-muted">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface">
            <span className="text-foreground/80">📍</span>
          </span>
          <p className="leading-relaxed whitespace-pre-line">
            {siteData.footer.contact.address}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface">
            <span className="text-foreground/80">✉</span>
          </span>
          <a
            className="hover:text-foreground transition-colors"
            href={`mailto:${siteData.footer.contact.email}`}
          >
            {siteData.footer.contact.email}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface">
            <span className="text-foreground/80">☎</span>
          </span>
          <a
            className="hover:text-foreground transition-colors"
            href={`tel:${siteData.footer.contact.phone.replace(/[^+0-9]/g, "")}`}
          >
            {siteData.footer.contact.phone}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface">
            <span className="text-foreground/80">⏱</span>
          </span>
          <span>{siteData.footer.contact.hours}</span>
        </div>
      </div>
    </div>
  );
}
