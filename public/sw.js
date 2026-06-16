// SAHAI service worker — offline-first caching for marketing pages.
//
// IMPORTANT: This SW intentionally does NOT cache /_next/* assets. Next.js
// already serves those with content-hashed URLs + immutable Cache-Control
// headers, so the browser HTTP cache handles them correctly. Caching them in
// the SW caused stale-JS hydration mismatches when chunk URLs collided across
// dev and prod sessions.
const VERSION = "v4";
const CACHE_PAGES = `sahai-pages-${VERSION}`;
const CACHE_ASSETS = `sahai-assets-${VERSION}`;

// Pages that should be available offline. Pre-cached at install time.
const PAGES = [
  "/",
  "/about",
  "/features",
  "/pricing",
  "/how-it-works",
  "/contact",
  "/faq",
  "/team",
  "/for-doctors",
  "/privacy-policy",
  "/terms",
];

const OFFLINE_URL = "/offline.html";

const ALLOWED_CACHES = [CACHE_PAGES, CACHE_ASSETS];

// ───────── INSTALL ─────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_PAGES);
      await Promise.all(
        [...PAGES, OFFLINE_URL].map(async (url) => {
          try {
            const req = new Request(url, { cache: "reload" });
            const res = await fetch(req);
            if (res && res.ok) {
              await cache.put(url, res.clone());
            }
          } catch {
            /* this URL just won't be available offline */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

// ───────── ACTIVATE ─────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !ALLOWED_CACHES.includes(key))
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

// ───────── HELPERS ─────────
// User-uploaded media + public images we want offline. Explicitly NOT
// /_next/static/* — that's owned by the browser HTTP cache.
function isCacheableAsset(url) {
  if (url.pathname.startsWith("/_next/")) return false;
  return /\.(?:png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf)$/i.test(
    url.pathname,
  );
}

async function networkFirstThenCache(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    if (fresh && (fresh.ok || fresh.type === "opaqueredirect")) {
      cache.put(req, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch {
    const cached = await cache.match(req);
    if (cached) return cached;
    const cachedAny = await caches.match(req, { ignoreSearch: true });
    if (cachedAny) return cachedAny;
    throw new Error("offline-no-cache");
  }
}

async function cacheFirstThenNetwork(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) {
      cache.put(req, fresh.clone()).catch(() => {});
    }
    return fresh;
  } catch {
    const fallback = await caches.match(req, { ignoreSearch: true });
    if (fallback) return fallback;
    throw new Error("offline-no-asset");
  }
}

// ───────── FETCH ─────────
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Hands-off zones — let the browser handle these directly.
  // /_next/* in particular is the cause of dev/prod chunk poisoning.
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/__nextjs") ||
    url.pathname === "/sw.js"
  ) {
    return;
  }

  // Kill-switch: visiting any URL with ?nosw=1 unregisters this worker and
  // wipes its caches, then falls through to network. Useful when something
  // ever goes weird in production.
  if (url.searchParams.get("nosw") === "1") {
    event.respondWith(
      (async () => {
        try {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
          await self.registration.unregister();
        } catch {
          /* ignore */
        }
        return fetch(req);
      })(),
    );
    return;
  }

  // HTML page navigations — network-first with offline fallback
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await networkFirstThenCache(req, CACHE_PAGES);
        } catch {
          const offline = await caches.match(OFFLINE_URL);
          if (offline) return offline;
          return new Response(
            "<h1>Offline</h1><p>You're offline and this page isn't cached yet.</p>",
            {
              status: 503,
              headers: { "Content-Type": "text/html; charset=utf-8" },
            },
          );
        }
      })(),
    );
    return;
  }

  // Cacheable user-facing assets (images, fonts in /public/) — cache-first
  if (isCacheableAsset(url)) {
    event.respondWith(
      cacheFirstThenNetwork(req, CACHE_ASSETS).catch(
        () => new Response("", { status: 504 }),
      ),
    );
    return;
  }

  // Everything else (RSC payloads, JSON, API) — network-first with cache
  // fallback for offline. /_next/* was already excluded above.
  event.respondWith(
    networkFirstThenCache(req, CACHE_PAGES).catch(
      () => new Response("", { status: 504 }),
    ),
  );
});
