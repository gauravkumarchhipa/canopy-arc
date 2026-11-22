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

## Homepage ribbon story

The homepage already blended a strand mesh, but its globe, panel stack, brain graph, and shield were independently staged. The text dropped out around chapter boundaries, the camera used a similar composition for most chapters, and the selected-work cards used concept artwork. The first pass used the running homepage and checked-in implementation as its baseline. The follow-up below also uses the recording.

| Files | Finding and change |
| --- | --- |
| `app/components/sections/home/StoryScene.tsx`, `story-geometry.ts`, `story-ribbon.ts` | One procedural assembly of 24 ribbons keeps the same vertex order through six poses. A twisted strip opens into a vault, routes into stacked software channels, crosses at an inference junction, wraps into a protective shell, then opens into the finished canopy. Parallel-transport frames keep the bevels aligned. Brushed metal, glass inlays, studio reflection panels, and contact shadows share one lighting rig. The old effect shaders were removed. |
| `app/components/sections/home/StoryExperience.tsx`, `story-timeline.ts` | A single ScrollTrigger timeline drives geometry, camera, lighting, and text. Each pose has a short hold. At each copy handoff exactly one chapter owns the heading, focus, and service links. The stage updates on demand and suspends drawing offscreen or in a hidden tab. |
| `app/components/sections/home/StoryContent.tsx`, `StoryStill.tsx`, `story-chapters.ts`, `app/home-story.css` | Kept the brand type and chapter titles. Tightened the supporting copy, varied the vertical composition, and used projections of the same ribbon paths for loading, reduced motion, and WebGL fallback. |
| `app/components/sections/home/StoryEpilogueSections.tsx`, `app/content/pages/work/products.json`, `app/work/[id]/ProjectSections.tsx` | The finished canopy returns as a quiet contact-section detail. The existing impact figures and service links lead into screenshots and factual product overviews for Sahai and Pannobaa. |

The scene uses procedural meshes, local reflections, a compact geometry tier, and adaptive pixel ratio and materials. The project captures are WebP images from the live sites. [Sahai](https://sahaiai.vercel.app/) · [Pannobaa Services](https://www.pannobaa.com/services)

### Verification

- The production preview recorded a median 17 ms frame interval on Intel Iris Xe in Chromium at 1440 × 900 and an emulated 390 × 844 touch viewport. Slow and fast sweeps in both directions visited all six chapters with one visible heading at each sampled frame. The canvas submitted zero draw calls during a settled idle interval.
- Verified direct chapter and lower-section anchors, keyboard focus after chapter navigation, rotation, light and dark themes, reduced motion, and the WebGL-unavailable illustration. Responsive checks covered 320 × 568, 768 × 1024, and 1024 × 650 alongside the two performance viewports.
- Both project detail pages, the cybersecurity service, and the booking anchor returned HTTP 200 in the fresh production preview. The contact form exposed its expected validation and email-draft action. The environment used the existing static footer fallback because its Supabase connection was unavailable.
- Mobile timing came from browser emulation on the desktop GPU. Physical mobile performance remains unmeasured.

## Brand opening and header

The November 21 recording shows the earlier homepage after it has loaded. Its static header mark appears over the globe, the wireframe AI scene, and the capabilities section. The current opening uses the ribbon already built for the six-chapter story. The linked conversation required sign-in, so the recording and checkout supplied the reference.

- `app/components/layout/BrandLockup.tsx`, `app/components/layout/header/Logo.tsx`, and `app/premium.css` share a tightly cropped mask of the existing canopy mark and a Manrope wordmark. A single highlight sweeps the mark on hover or keyboard focus. `HeaderShell.tsx` follows the global beige and charcoal theme through the chapters.
- `app/components/sections/home/BrandOpening.tsx`, `brand-opening.ts`, `app/page.tsx`, `app/layout.tsx`, and `app/home-story.css` stage the opening when the homepage is the tab's first Canopy Arc page. The first chapter's ribbon draws across the opening before the brand lockup docks to the live header and the panel reveals the story. Skip, reduced motion, and direct chapter links keep the page accessible.
- `app/components/sections/home/StoryExperience.tsx` defers WebGL startup until the opening clears. The projected chapter ribbon is available during the handoff while the interactive scene initializes.

Browser checks observed the lockup docking at the live header in 1440 × 900, 390 × 844, and 320 × 568 Chromium viewports. A blocked JavaScript bundle cleared the opening through its first-paint timeout. The production scroll sweep still recorded a 17 ms median frame interval in desktop and mobile emulation, and the linked project, service, and contact destinations passed.

The final preview passed Skip intro with focus restored to the header home link, reload without replay, reduced motion, direct chapter navigation, and returning home from another page in the same tab.

## Deployed and local homepage hybrid

The deployed homepage and the earlier recording supplied the environmental plates, glass, and contrasting chapter silhouettes. The newer recording and local homepage supplied the spacing, Manrope hierarchy, restrained navigation, and framing. Both versions were inspected before the hybrid pass.

| Files | Hybrid direction |
| --- | --- |
| `app/components/sections/home/story-ribbon.ts`, `story-geometry.ts` | The same indexed paths run through the glass sphere, swept vault, device rails, spatial network, enclosed network, and final canopy. The connections keep their node positions while the protection shell closes. |
| `app/components/sections/home/StoryDetails.tsx`, `StoryScene.tsx` | A reusable split shell, three real project captures, instanced network connections, and a restrained reflected pass run in the main canvas. Optical and reflection effects scale down on slower or mobile configurations. |
| `app/components/sections/home/story-timeline.ts`, `StoryExperience.tsx`, `StoryStill.tsx`, `app/home-story.css` | Scroll coordinates the camera, geometry, chapter copy, and the grade of the two existing studio plates. The semantic chapter view includes matching illustrations for reduced motion and WebGL fallback. |
| `app/components/layout/header/HeaderShell.tsx`, `app/premium.css`, `StoryEpilogueSections.tsx` | The header responds to the stage palette. Commitment text uses the shared editorial reveal. Service summaries appear on hover or keyboard focus. Impact figures, project destinations, and contact actions retain their existing sources. |

The three screen textures show the public Sahai and Pannobaa sites, including Sahai at a mobile viewport. [Sahai](https://sahaiai.vercel.app/) · [Pannobaa Services](https://www.pannobaa.com/services)
