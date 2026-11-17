# Cybersecurity and Team ? 3D visual update

Implemented November 18, 2026. The production preview runs at http://localhost:3000.

## Design

- **Cybersecurity:** a custom beveled shield, perimeter protection layers, and a silver lock. The model replaces the old flat security illustration.
- **Team:** eight connected silver/ceramic modules express collaboration. The existing headline, content, and counters remain, with a new editorial hero and larger profile cards.
- Profile artwork uses the existing initials and names; no portraits or additional people were fabricated.
- Team discipline filters remain functional. The previous inert sort button is now a native select supporting expertise and name ordering.
- Materials and surrounding UI follow the existing ivory/graphite light and dark themes.

## Interaction and loading

Both models support desktop dragging, keyboard/touch rotation buttons, reset, and pause. Touch devices retain normal scrolling across the visual. Reduced motion disables ambient animation while allowing deliberate rotation. Unsupported WebGL devices receive an immediate SVG study with disabled 3D controls and a clear static-view label.

Three.js is dynamically imported when the visual approaches the viewport. Pixel ratio is capped at 1.5 on desktop and 1 on initial mobile load. Animation stops outside the viewport or in a hidden tab. Geometry, materials, controls, environment targets, event listeners, observers, and renderers are disposed on unmount. Theme changes update materials in place.

## Verified

- Production build, TypeScript, scoped ESLint, and whitespace checks passed.
- Both models rendered with WebGL, with no uncaught JavaScript page errors.
- Actual drag gestures and rotate buttons changed screenshot pixels; reset and pause controls passed.
- Light/dark desktop and mobile screenshots were visually reviewed.
- No horizontal overflow at 320, 390, 768, and 1024 pixels.
- Native touch rotation passed; the canvas did not capture mobile scrolling.
- Reduced-motion controls and WebGL-unavailable fallbacks passed, including disabled controls in static mode.
- Team filtering and A?Z name sorting passed.
- Both updated pages passed 24 default/hover/focus, light/dark, desktop/mobile contrast combinations (5,822 measurements).

[Scene checks](checks.json) ? [Contrast summary](contrast/summary.json)

## Screenshots

- [Cybersecurity light](security-light.png) ? [dark](security-dark.png) ? [mobile](security-mobile.png)
- [Team light](team-light.png) ? [dark](team-dark.png) ? [mobile](team-mobile.png)
- [Team directory on mobile](team-directory-mobile.png)

The pre-existing Supabase footer fallback remains active. No forms, authentication flows, or external services were modified.
