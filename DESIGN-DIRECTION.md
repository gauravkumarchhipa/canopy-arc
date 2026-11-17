# Canopy Arc — redesign direction

Three directions were considered before implementation:

| Direction | Personality and hero | Typography and color | Interaction / 3D / scroll | Mobile and distinction |
| --- | --- | --- | --- | --- |
| Architectural canopy (selected) | Quiet, precise technology partner; editorial headline beside a protective pavilion | Manrope with selective Fraunces accents; warm ivory and graphite | Custom silver structural ribs, pointer tilt and slow breathing motion; native content flow with selective entrance reveals | Headline first, compact sculpture beneath; brand-specific architecture rather than unrelated decorative objects |
| Digital atelier | Human, craft-led studio; oversized project photography | Warm paper, ink, serif-led headings | Image crop reveals, project preview interactions; minimal 3D | Touch-first project stack; stronger fit when original project photography is available |
| Connected systems | Engineering-first; interactive typographic service map | Monochrome, compact sans-serif, technical labels | Service connections and restrained diagram choreography; no decorative 3D | Service index becomes stacked navigation; useful but less distinctive than the canopy |

The architectural direction best connects the existing canopy identity with the promise to connect and protect. It is feasible using the existing Three.js dependency, without adding another rendering or motion framework.

## Implementation

- Warm light and graphite dark palettes applied through shared semantic variables.
- Existing cookie-based theme preference retained; system preference is read before paint when no explicit choice exists.
- Shared navigation, page introductions, buttons, service cards, work cards, and form containers use the same restrained language.
- The homepage retains the existing hero message and all impact figures and commitment content. Capabilities and featured work reference the existing content sources.
- Procedural 3D sculpture uses locally generated geometry and environment lighting, with no third-party asset requests. A static SVG remains available while loading or if WebGL fails.
- The canvas caps device pixel ratio, pauses outside the viewport and hidden tabs, respects reduced motion, and disposes resources on unmount.
- Original project cover compositions are editorial interpretations, not screenshots of the products.
- No additional business claims, testimonials, customer logos, or awards have been introduced.
- Existing intro-loader files remain available, but the shared chrome renders content immediately.

## Consistency refinement — November 18, 2026

- Removed the remaining blue accents, pastel case-study gradients, and multicolor treatments from active service, team, pricing, feature, and authentication views.
- Rebuilt the footer with a clear brand/contact column, four navigation columns, and a separate newsletter/support row. Contact icons and social links use simple monochrome treatments.
- Replaced case-study initials with distinct project concept previews: lead pipelines, brand architecture, enterprise modules, documents, mobile screens, AI forms, and charts. These are labeled as concepts rather than presented as actual product screenshots.
- Reorganized case studies into a two-column editorial grid with the final odd item featured across the grid. Descriptions remain readable in full.
- Restored all seven homepage count-up figures and moved the impact section directly below the hero, reachable at `/#impact`. The shared counter server-renders its final value, animates once on entry, preserves suffixes and decimals, reserves its final width, and respects reduced motion.
- Service statistics now reference the existing homepage figures, resolving the 40/24 developer and 12/8 year discrepancies without introducing new claims.
- Added streaming-aware page reveals, project hover motion, chart reveals, and a reading-progress line. Existing GSAP reveal wrappers keep ownership of their own animations.
- Browser verification observed the homepage count from `0+` to `150+`, confirmed `150+` immediately with reduced motion, exercised mobile navigation/filtering, and checked service detail overflow at 320, 390, 768, and 1024 pixels in addition to desktop review. No JavaScript page errors were reported in that focused run.
- A fresh production preview also returned HTTP 200 for About, Team, Work, Contact, Blog, Pricing, FAQ, and the web-development detail page. Each switched between the exact light and dark background tokens and showed no horizontal overflow at 390 pixels or JavaScript page errors. The long-running development preview had stale Turbopack module errors; development now uses Webpack (`npm run dev`) after independent production verification. Production still uses the existing `next build` pipeline.

## Validation

TypeScript checking, targeted ESLint, and the production build passed during implementation. Browser checks confirmed the WebGL scene, both themes, dark-theme persistence across navigation, mobile menu navigation, and the Design service filter. Layout checks at 320, 390, 768, 1024, and 1440 pixels found no horizontal overflow; mobile headlines were also checked for clipping. The focused browser run reported no JavaScript page errors. Desktop light/dark, services, and the full mobile homepage were visually reviewed.

The existing Supabase footer connection was unavailable; the application used its existing static footer fallback. The middleware naming deprecation remains outside this design change. No forms were submitted to external services. Real-user Core Web Vitals require deployment measurements; they are not guaranteed by these changes.

## Hover and focus verification ? November 18, 2026

Removed the remaining hard-coded white hover text from About, Careers, and shared card styles. Strengthened light-theme muted text and form placeholders, and corrected low-opacity team/feature/blog details. All 58 audited routes passed the final production check, covering 684 light/dark, desktop/mobile, and default/hover/focus combinations. The authenticated dashboard was checked only for its expected sign-in redirect. See [the audit report](artifacts/theme-audit/README.md) for coverage, screenshots, methodology, and limits. The local preview now serves the tested production build at port 3000.

## Cybersecurity and Team visual update ? November 18, 2026

Added two lazy-loaded Three.js sculptures: a layered security shield and a connected team assembly. The Team page now has a composed hero, an editorial statistics strip, larger initials-based profile art, and functional native sorting. Both scenes preserve the neutral themes and provide drag/rotate/reset/pause controls, reduced-motion behavior, visibility-aware rendering, resource cleanup, and SVG fallbacks. [Review screenshots and verification](artifacts/sculpture-review/README.md).
