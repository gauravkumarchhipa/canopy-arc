# Light and dark theme audit

Completed November 18, 2026 against the production build at http://localhost:3000.

## Result

- **58 routes checked:** 57 public views and the protected dashboard redirect.
- **684 combinations:** light/dark ? desktop/mobile ? default/hover/focus for each public view.
- **109,468 text and functional-icon measurements** across those combinations; no flagged contrast failures.
- No horizontal overflow at 1440 ? 1000 or 390 ? 844.
- No uncaught JavaScript page errors reported.
- A real Tab key check found a visible keyboard-focus outline on every public view.
- Production build, TypeScript checking, scoped ESLint, and whitespace checks passed.

## What changed

- About, Careers, and remaining shared card styles retain theme-aware heading, body, and icon colors during hover/focus instead of switching to white.
- The light theme uses a slightly darker muted text token so text remains readable on the stronger hover surface.
- Team icons, feature markers, and blog separators no longer rely on low-opacity text.
- Input and textarea placeholders use the muted token at full opacity, including the authentication and account-deletion forms.
- Legacy clipped text gradients were replaced with semantic muted text colors. Inverted components and the video play symbol use the opposite surface/text pair.

## Visual evidence

Actual pointer-hover captures of the About cards from the supplied screenshots:

- [Pillar, light theme](about-pillar-hover-light.png)
- [Pillar, dark theme](about-pillar-hover-dark.png)
- [Value, light theme](about-value-hover-light.png)
- [Value, dark theme](about-value-hover-dark.png)

## Method and limits

The audit checks rendered text colors against composited ancestor backgrounds, using 4.5:1 for normal text and 3:1 for large text and functional SVG icons. It samples CSS hover and focus/focus-within states through browser pseudo-state controls. Fonts are awaited and motion is reduced to keep measurements stable. Decorative artwork and hidden content are excluded. This is a targeted contrast and layout regression check, not a complete accessibility certification or functional test of every workflow.

All 15 service pages, 6 project pages, 8 team profiles, 6 blog articles, authentication pages, policy pages, the reset-link view with a dummy desktop token, and the not-found view are included. The missing-page route correctly returned 404. The dashboard correctly redirected to sign-in; its authenticated content needs a valid session and was not visually audited. No forms were submitted, accounts created, or external messages sent. The existing Supabase footer connection was unavailable, so its existing fallback was used.

## Reproduction

`audit.cjs` requires Playwright and an installed Chromium browser. Use `PLAYWRIGHT_MODULE_PATH` if Playwright is supplied by an external QA environment, `CHROME_EXECUTABLE` for an existing browser executable, and `THEME_AUDIT_URL` to select the running site. `THEME_AUDIT_ROUTES` optionally limits a local rerun to comma-separated paths. No test dependency was added to the application.

```powershell
node artifacts/theme-audit/audit.cjs
```

[Detailed state results](report.json) ? [Machine-readable summary](summary.json)

## Route coverage

| Route | HTTP | Coverage | Result |
| --- | --- | --- | --- |
| `/` | 200 | 12 theme/viewport/state combinations | Pass |
| `/__theme-audit-not-found` | 404 | 12 theme/viewport/state combinations | Pass |
| `/about` | 200 | 12 theme/viewport/state combinations | Pass |
| `/blog` | 200 | 12 theme/viewport/state combinations | Pass |
| `/blog/ai-products-from-prototype-to-production` | 200 | 12 theme/viewport/state combinations | Pass |
| `/blog/building-performant-nextjs-websites` | 200 | 12 theme/viewport/state combinations | Pass |
| `/blog/cloud-cost-optimization-playbook` | 200 | 12 theme/viewport/state combinations | Pass |
| `/blog/design-systems-that-scale` | 200 | 12 theme/viewport/state combinations | Pass |
| `/blog/shipping-mvps-without-tech-debt` | 200 | 12 theme/viewport/state combinations | Pass |
| `/blog/ux-patterns-for-b2b-saas` | 200 | 12 theme/viewport/state combinations | Pass |
| `/careers` | 200 | 12 theme/viewport/state combinations | Pass |
| `/contact` | 200 | 12 theme/viewport/state combinations | Pass |
| `/cookies` | 200 | 12 theme/viewport/state combinations | Pass |
| `/dashboard` | 200 | Sign-in redirect | Pass |
| `/delete-account` | 200 | 12 theme/viewport/state combinations | Pass |
| `/faq` | 200 | 12 theme/viewport/state combinations | Pass |
| `/features` | 200 | 12 theme/viewport/state combinations | Pass |
| `/for-doctors` | 200 | 12 theme/viewport/state combinations | Pass |
| `/forgot-password/theme-audit-preview` | 200 | 12 theme/viewport/state combinations | Pass |
| `/how-it-works` | 200 | 12 theme/viewport/state combinations | Pass |
| `/pricing` | 200 | 12 theme/viewport/state combinations | Pass |
| `/privacy` | 200 | 12 theme/viewport/state combinations | Pass |
| `/privacy-policy` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/ai-ml` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/app-development` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/ar-vr` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/backend-api` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/cloud-devops` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/cybersecurity` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/data-engineering` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/digital-marketing` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/ecommerce-saas` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/enterprise-solutions` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/iot` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/qa-automation` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/ui-ux-design` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/video-content` | 200 | 12 theme/viewport/state combinations | Pass |
| `/services/web-development` | 200 | 12 theme/viewport/state combinations | Pass |
| `/signin` | 200 | 12 theme/viewport/state combinations | Pass |
| `/signup` | 200 | 12 theme/viewport/state combinations | Pass |
| `/team` | 200 | 12 theme/viewport/state combinations | Pass |
| `/team/anjali-singh` | 200 | 12 theme/viewport/state combinations | Pass |
| `/team/arjun-patel` | 200 | 12 theme/viewport/state combinations | Pass |
| `/team/meera-iyer` | 200 | 12 theme/viewport/state combinations | Pass |
| `/team/neha-kapoor` | 200 | 12 theme/viewport/state combinations | Pass |
| `/team/priya-nair` | 200 | 12 theme/viewport/state combinations | Pass |
| `/team/rohit-sharma` | 200 | 12 theme/viewport/state combinations | Pass |
| `/team/sandeep-patel` | 200 | 12 theme/viewport/state combinations | Pass |
| `/team/vikram-joshi` | 200 | 12 theme/viewport/state combinations | Pass |
| `/terms` | 200 | 12 theme/viewport/state combinations | Pass |
| `/work` | 200 | 12 theme/viewport/state combinations | Pass |
| `/work/guestpostlinks` | 200 | 12 theme/viewport/state combinations | Pass |
| `/work/orme-industries` | 200 | 12 theme/viewport/state combinations | Pass |
| `/work/pannobaa` | 200 | 12 theme/viewport/state combinations | Pass |
| `/work/sahai-ai` | 200 | 12 theme/viewport/state combinations | Pass |
| `/work/tender247` | 200 | 12 theme/viewport/state combinations | Pass |
| `/work/zyapaar` | 200 | 12 theme/viewport/state combinations | Pass |

## Subsequent scoped update

The Cybersecurity and Team 3D redesign was verified separately after this full-site audit. Both updated pages passed 24 additional theme/viewport/interaction combinations; [see the current visual review](../sculpture-review/README.md).
