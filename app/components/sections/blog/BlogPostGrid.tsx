"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "../../../content/pages/blog/posts";
import { blogCategories } from "../../../content/pages/blog/posts";
import BlogPostCard from "./BlogPostCard";

function chipClass(active: boolean) {
  return `inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors ${
    active
      ? "border-accent/35 bg-accent/10 text-accent shadow-[0_0_0_1px_rgba(37,99,235,0.12)]"
      : "border-line bg-background text-muted hover:bg-surface hover:text-foreground"
  }`;
}

type Props = {
  posts: BlogPost[];
};

export default function BlogPostGrid({ posts }: Props) {
  const [active, setActive] = useState(blogCategories[0]);

  const filtered = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.category === active);
  }, [active, posts]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {blogCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={chipClass(active === category)}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 overflow-visible p-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">No posts in this category yet.</p>
      ) : null}
    </>
  );
}
