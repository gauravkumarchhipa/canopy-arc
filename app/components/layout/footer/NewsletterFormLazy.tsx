"use client";

import dynamic from "next/dynamic";

const NewsletterForm = dynamic(() => import("../NewsletterForm"), {
  ssr: false,
      loading: () => (
    <div
      aria-hidden
      className="footer-newsletter-form mt-5 h-11 rounded-xl border border-line bg-surface"
    />
  ),
});

export default function NewsletterFormLazy() {
  return <NewsletterForm />;
}
