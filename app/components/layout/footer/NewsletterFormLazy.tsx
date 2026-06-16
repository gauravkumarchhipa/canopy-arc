"use client";

import dynamic from "next/dynamic";

const NewsletterForm = dynamic(() => import("../NewsletterForm"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="mt-4 h-11 rounded-full border border-line-strong bg-surface"
    />
  ),
});

export default function NewsletterFormLazy() {
  return <NewsletterForm />;
}
