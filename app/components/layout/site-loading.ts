export const siteLoadingAttribute = "data-site-loading";
export const siteRevealDuration = 2340;

// Arm the overlay on a document load. Client-side route changes keep the same layout.
export const siteLoadingBootstrap = `(function () {
  var root = document.documentElement;
  var attribute = "${siteLoadingAttribute}";
  var maximumWait = setTimeout(finish, 4800);

  function finish() {
    clearTimeout(maximumWait);
    root.removeAttribute(attribute);
  }

  function revealPage() {
    var reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var mark = document.querySelector(".site-loading-mark");
    var animation = mark && mark.getAnimations().find(function (item) {
      return item.animationName === "site-reveal-mark";
    });
    var elapsed = animation ? Number(animation.currentTime) : 0;
    setTimeout(finish, reducedMotion ? 250 : Math.max(120, ${siteRevealDuration} - elapsed));
  }

  root.setAttribute(attribute, "");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revealPage, { once: true });
  } else {
    revealPage();
  }
})();`;
