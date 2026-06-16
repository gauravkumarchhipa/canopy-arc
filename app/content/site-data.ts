import raw from "./site-data.json";

export type SiteData = typeof raw;

/**
 * Single source of truth for all content.
 * Keep this file imported from server components only.
 */
export const siteData: SiteData = raw;

