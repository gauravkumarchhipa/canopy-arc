"use client";

import dynamic from "next/dynamic";

const NewsletterForm = dynamic(() => import("../NewsletterForm"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="footer-subscribe-form h-14"
    />
  ),
});

export default function NewsletterFormLazy() {
  return <NewsletterForm />;
}
