import NewsletterFormLazy from "./NewsletterFormLazy";

export default function FooterNewsletter() {
  return (
    <div className="col-span-2 sm:col-span-1">
      <h4 className="text-xs tracking-[0.2em] uppercase text-muted mb-5">
        Stay Updated
      </h4>
      <p className="text-sm text-muted leading-relaxed">
        Subscribe to our newsletter and get the latest updates, insights and
        exclusive offers.
      </p>
      <NewsletterFormLazy />
    </div>
  );
}
