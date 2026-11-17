/* Read-only browser audit. Does not submit forms or create authenticated sessions. */
const fs = require("fs");
const path = require("path");
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE_PATH || "playwright",
);
const base = process.env.THEME_AUDIT_URL || "http://localhost:3000";
const output = path.resolve(process.env.THEME_AUDIT_OUTPUT || "artifacts/theme-audit");
fs.mkdirSync(output, { recursive: true });
const read = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const serviceSource = fs.readFileSync(
  "app/content/pages/services/services.ts",
  "utf8",
);
const services = [...serviceSource.matchAll(/^\s+id: '([^']+)'/gm)].map(
  (match) => match[1],
);
const routes = process.env.THEME_AUDIT_ROUTES
  ? process.env.THEME_AUDIT_ROUTES.split(",")
  : [
      "/",
      "/about",
      "/services",
      "/work",
      "/team",
      "/contact",
      "/careers",
      "/blog",
      "/pricing",
      "/features",
      "/for-doctors",
      "/how-it-works",
      "/faq",
      "/terms",
      "/privacy",
      "/privacy-policy",
      "/cookies",
      "/delete-account",
      "/signin",
      "/signup",
      "/forgot-password/theme-audit-preview",
      "/__theme-audit-not-found",
      ...services.map((id) => "/services/" + id),
      ...read("app/content/pages/work/products.json").map(
        (item) => "/work/" + item.id,
      ),
      ...read("app/content/pages/team/grid.json").members.map(
        (item) => "/team/" + item.id,
      ),
      ...read("app/content/pages/blog/posts.json").map(
        (item) => "/blog/" + item.slug,
      ),
      "/dashboard",
    ];
function inspect() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const colors = new Map();
  const rgba = (value) => {
    if (colors.has(value)) return colors.get(value);
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const p = ctx.getImageData(0, 0, 1, 1).data;
    const result = [p[0] / 255, p[1] / 255, p[2] / 255, p[3] / 255];
    colors.set(value, result);
    return result;
  };
  const over = (front, back) => {
    const a = front[3] + back[3] * (1 - front[3]);
    return [0, 1, 2]
      .map(
        (i) =>
          (front[i] * front[3] + back[i] * back[3] * (1 - front[3])) / (a || 1),
      )
      .concat(a);
  };
  const lum = (c) =>
    c
      .slice(0, 3)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
  const ratio = (a, b) => {
    const x = lum(a),
      y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  };
  const backgrounds = new WeakMap();
  const background = (el) => {
    if (!el) return [1, 1, 1, 1];
    if (backgrounds.has(el)) return backgrounds.get(el);
    const s = getComputedStyle(el);
    let own = rgba(s.backgroundColor);
    if (s.backgroundImage.startsWith("linear-gradient(")) {
      const match = s.backgroundImage.match(/rgba?\([^)]*\)/);
      if (match) own = rgba(match[0]);
    }
    const result = own[3] === 1 ? own : over(own, background(el.parentElement));
    backgrounds.set(el, result);
    return result;
  };
  const failures = [];
  let tested = 0;
  const check = (el, text, color, minimum) => {
    if (
      !text.trim() ||
      /^[\s���????+��|/]+$/.test(text) ||
      el.closest(
        '[aria-hidden="true"],svg,canvas,script,style,[hidden],.sr-only,:disabled,[aria-disabled="true"]',
      )
    )
      return;
    const rect = el.getBoundingClientRect(),
      s = getComputedStyle(el);
    if (
      !rect.width ||
      !rect.height ||
      s.visibility === "hidden" ||
      s.display === "none" ||
      (s.clipPath !== "none" && s.clipPath.includes("50%"))
    )
      return;
    let opacity = 1;
    for (let a = el; a; a = a.parentElement) {
      const st = getComputedStyle(a);
      opacity *= Number(st.opacity);
      if (st.display === "none" || st.visibility === "hidden") return;
    }
    if (opacity < 0.02) return;
    const bg = background(el),
      fg = rgba(color || s.color).slice();
    fg[3] *= opacity;
    const visible = over(fg, bg),
      contrast = ratio(visible, bg);
    const large =
      parseFloat(s.fontSize) >= 24 ||
      (parseFloat(s.fontSize) >= 18.66 && parseFloat(s.fontWeight) >= 700);
    const required = minimum ?? (large ? 3 : 4.5);
    tested++;
    if (contrast + 0.03 < required)
      failures.push({
        text: text.trim().slice(0, 100),
        tag: el.tagName,
        className: String(el.className).slice(0, 220),
        ratio: Number(contrast.toFixed(2)),
        required,
        color: color || s.color,
        background: bg.slice(0, 3).map((v) => Math.round(v * 255)),
      });
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode()))
    check(node.parentElement, node.textContent);
  document.querySelectorAll("button svg,a[aria-label] svg").forEach((svg) => {
    const el = svg.closest("button,a");
    check(
      el,
      "icon: " + (el.getAttribute("aria-label") || el.innerText),
      getComputedStyle(svg).color,
      3,
    );
  });
  document
    .querySelectorAll("[data-counter]")
    .forEach((el) => check(el, el.getAttribute("aria-label") || ""));
  document.querySelectorAll("input,textarea").forEach((el) => {
    if (
      [
        "checkbox",
        "radio",
        "hidden",
        "submit",
        "button",
        "image",
        "color",
        "range",
      ].includes(el.type)
    )
      return;
    if (el.placeholder && !el.value)
      check(
        el,
        "placeholder: " + el.placeholder,
        getComputedStyle(el, "::placeholder").color,
      );
    else if (el.value) check(el, el.value);
  });
  const unique = [
    ...new Map(
      failures.map((f) => [f.text + "|" + f.className + "|" + f.ratio, f]),
    ).values(),
  ];
  return {
    tested,
    failures: unique,
    overflow: document.documentElement.scrollWidth > innerWidth,
    theme: document.documentElement.dataset.theme,
  };
}
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_EXECUTABLE
      ? { executablePath: process.env.CHROME_EXECUTABLE }
      : {}),
  });
  const results = [];
  let cursor = 0;
  async function worker() {
    while (cursor < routes.length) {
      const route = routes[cursor++];
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
        reducedMotion: "reduce",
        colorScheme: "light",
        serviceWorkers: "block",
      });
      const page = await context.newPage();
      page.setDefaultNavigationTimeout(120000);
      page.setDefaultTimeout(15000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const result = {
        route,
        expectedStatus: route === "/__theme-audit-not-found" ? 404 : 200,
        states: [],
      };
      try {
        const response = await page.goto(base + route, {
          waitUntil: "domcontentloaded",
        });
        result.status = response.status();
        result.finalPath = new URL(page.url()).pathname;
        if (route === "/dashboard") {
          result.protectedRedirect = result.finalPath === "/signin";
          console.log(
            JSON.stringify({
              route,
              protectedRedirect: result.protectedRedirect,
            }),
          );
          continue;
        }
        await page.locator("h1").first().waitFor();
        await page.evaluate(async () => {
          await document.fonts.ready;
        });
        await page.keyboard.press("Tab");
        result.keyboardFocusVisible = await page.evaluate(() => {
          const el = document.activeElement;
          return (
            el !== document.body &&
            parseFloat(getComputedStyle(el).outlineWidth) > 0
          );
        });
        await page.evaluate(() => document.activeElement?.blur());
        await page.waitForFunction(
          () => document.documentElement.dataset.theme === "light",
        );
        await page.addStyleTag({
          content:
            "*,*::before,*::after{transition:none!important;animation:none!important}.reveal-line>span{transform:none!important}",
        });
        const cdp = await context.newCDPSession(page);
        await cdp.send("DOM.enable");
        await cdp.send("CSS.enable");
        for (const theme of ["light", "dark"]) {
          if (theme === "dark") {
            await page.emulateMedia({ colorScheme: "dark" });
            await page.waitForFunction(
              () => document.documentElement.dataset.theme === "dark",
            );
          }
          for (const width of [1440, 390]) {
            await page.setViewportSize({
              width,
              height: width === 390 ? 844 : 1000,
            });
            const doc = await cdp.send("DOM.getDocument");
            const { nodeIds } = await cdp.send("DOM.querySelectorAll", {
              nodeId: doc.root.nodeId,
              selector:
                'a,button,input,textarea,select,summary,[class~="group"],[class~="group/card"]',
            });
            for (const state of ["default", "hover", "focus"]) {
              const forcedPseudoClasses =
                state === "hover"
                  ? ["hover"]
                  : state === "focus"
                    ? ["focus", "focus-visible", "focus-within"]
                    : [];
              await Promise.all(
                nodeIds.map((nodeId) =>
                  cdp
                    .send("CSS.forcePseudoState", {
                      nodeId,
                      forcedPseudoClasses,
                    })
                    .catch(() => {}),
                ),
              );
              await page.evaluate(() => new Promise(requestAnimationFrame));
              const check = await page.evaluate(inspect);
              result.states.push({ theme, width, state, ...check });
            }
            await Promise.all(
              nodeIds.map((nodeId) =>
                cdp
                  .send("CSS.forcePseudoState", {
                    nodeId,
                    forcedPseudoClasses: [],
                  })
                  .catch(() => {}),
              ),
            );
          }
        }
        result.errors = errors;
        console.log(
          JSON.stringify({
            route,
            status: result.status,
            states: result.states.length,
            textChecks: result.states.reduce((a, s) => a + s.tested, 0),
            failures: result.states.reduce((a, s) => a + s.failures.length, 0),
            overflow: result.states.some((s) => s.overflow),
            errors,
          }),
        );
      } catch (error) {
        result.error = error.message;
        console.log(JSON.stringify({ route, error: error.message }));
      } finally {
        results.push(result);
        await context.close();
        fs.writeFileSync(
          path.join(output, "report.json"),
          JSON.stringify(
            { base, generatedAt: new Date().toISOString(), results },
            null,
            2,
          ),
        );
      }
    }
  }
  try {
    await Promise.all([worker(), worker(), worker()]);
  } finally {
    await browser.close();
  }
  const failures = results.filter(
    (r) =>
      r.error ||
      r.errors?.length ||
      r.states?.some((s) => s.failures.length || s.overflow) ||
      r.status !== r.expectedStatus ||
      (r.route === "/dashboard" && !r.protectedRedirect),
  );
  const summary = {
    routes: results.length,
    states: results.reduce((a, r) => a + (r.states?.length || 0), 0),
    textChecks: results.reduce(
      (a, r) => a + (r.states?.reduce((n, s) => n + s.tested, 0) || 0),
      0,
    ),
    failingRoutes: failures.map((r) => r.route),
  };
  fs.writeFileSync(
    path.join(output, "summary.json"),
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary));
  if (failures.length) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
