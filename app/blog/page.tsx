import { BlogHero, BlogArticles, BlogContact } from "./BlogSections";
import type { Metadata } from "next";
import { tw } from "../lib/tw";

export const metadata: Metadata = {
  title: "Blog — Canopy Arc",
  description:
    "Insights on engineering, design, AI, cloud, and product delivery from the Canopy Arc team.",
};

export default function BlogPage() {
  return (
    <div className={tw.pageShellBottom}>
      <BlogHero />

      <BlogArticles />

      <BlogContact />
    </div>
  );
}
