"use client";

import dynamic from "next/dynamic";

const NewsletterForm = dynamic(() => import("../NewsletterForm"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="mt-5 flex h-11 items-stretch overflow-hidden rounded-xl border border-line-strong bg-surface"
    />
  ),
});

export default function NewsletterFormLazy() {
  return <NewsletterForm />;
}
