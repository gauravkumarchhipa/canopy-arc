import { brand } from "./shared/brand";
import { nav } from "./shared/nav";
import { footer } from "./layout/footer";
import { homeHero } from "./pages/home/hero";
import { homeImpact } from "./pages/home/impact";
import { servicesHero } from "./pages/services/hero";
import { servicesGrid } from "./pages/services/grid";
import { teamHero } from "./pages/team/hero";
import { teamGrid } from "./pages/team/grid";
import { workHero } from "./pages/work/hero";
import { workGrid } from "./pages/work/grid";

/** @deprecated Prefer importing from page/component content modules directly. */
export const siteData = {
  brand,
  nav,
  home: {
    hero: homeHero,
    impact: homeImpact,
  },
  services: {
    hero: servicesHero,
    filters: servicesGrid.filters,
    cards: servicesGrid.cards,
  },
  team: {
    hero: {
      eyebrow: teamHero.eyebrow,
      title: teamHero.title,
      subtitle: teamHero.subtitle,
    },
    stats: teamHero.stats,
    filters: teamGrid.filters,
    members: teamGrid.members,
  },
  work: {
    hero: {
      eyebrow: workHero.eyebrow,
      title: workHero.title,
      subtitle: workHero.subtitle,
    },
    stats: workHero.stats,
    filters: workGrid.filters,
    projects: workGrid.projects,
  },
  footer,
} as const;

export type SiteData = typeof siteData;
