import products from "./products.json";

export type ProductLink = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  icon: string;
  year: number;
  highlight?: string;
  image?: string;
};

export const productLinks = products as ProductLink[];

export const productCategories = [...new Set(productLinks.map((p) => p.category))];

export const workGrid = {
  filters: ["All", ...productCategories],
  projects: productLinks,
};

export type WorkGridContent = typeof workGrid;
