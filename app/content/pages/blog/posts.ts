import posts from "./posts.json";
import bodies from "./post-bodies.json";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
};

export type BlogPostBody = {
  paragraphs: string[];
};

export const blogPosts = posts as BlogPost[];

export const blogPostBodies = bodies as Record<string, BlogPostBody>;

export const blogCategories = [
  "All",
  ...new Set(blogPosts.map((p) => p.category)),
];

export function getBlogPost(slug: string) {
  const meta = blogPosts.find((p) => p.slug === slug);
  if (!meta) return null;
  const body = blogPostBodies[slug];
  if (!body) return null;
  return { ...meta, ...body };
}

export function formatBlogDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
