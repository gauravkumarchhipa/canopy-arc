"use client";

import Button from "../../ui/Button";
import ArrowIcon from "../../ui/ArrowIcon";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../layout/ThemeProvider";
import { useLenis } from "../../layout/SmoothScroll";
import { chapters, lastChapter } from "./story-chapters";
import { sampleStory } from "./story-timeline";
import { siteLoadingAttribute } from "../../layout/site-loading";
import StorySceneBoundary from "./StorySceneBoundary";

const StoryScene = dynamic(() => import("./StoryScene"), { ssr: false });
const motionQuery = "(prefers-reduced-motion: no-preference) and (min-height: 540px)";
const compactQuery = "(max-width: 1100px)";
const compactMotionQuery = "(min-height: 38.75rem)";
const coarsePointerQuery = "(pointer: coarse)";
const controlId = "story-stage";

export type SceneMotion = {
  progress: number;
  orbit: number;
  pointerX: number;
  pointerY: number;
  darkTheme: boolean;
};

export default function StoryExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const nextControl = useRef<HTMLAnchorElement>(null);
  const motion = useRef<SceneMotion>({ progress: 0, orbit: 0, pointerX: 0, pointerY: 0, darkTheme: false });
  const renderRequest = useRef<(() => void) | null>(null);
  const syncTheme = useRef<(() => void) | null>(null);
  const drag = useRef<{ pointer: number; x: number } | null>(null);
  const pendingFocus = useRef<number | null>(null);
  const lenis = useLenis();
  const theme = useTheme();
  const [enhanced, setEnhanced] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const setRenderRequest = useCallback((request: (() => void) | null) => {
    renderRequest.current = request;
  }, []);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const motionPreference = window.matchMedia(motionQuery);
    const compactLayout = window.matchMedia(compactQuery);
    const compactHeight = window.matchMedia(compactMotionQuery);
    const coarsePointer = window.matchMedia(coarsePointerQuery);
    const supportsCompactStage = CSS.supports("grid-template-rows", "subgrid");
    const queries = [motionPreference, compactLayout, compactHeight, coarsePointer];
    const sync = () => {
      const canPin = motionPreference.matches && (!compactLayout.matches || (compactHeight.matches && supportsCompactStage));
      if (!canPin) {
        setReady(false);
        setOnScreen(false);
        pendingFocus.current = null;
      }
      setEnhanced(canPin);
      setCompact(compactLayout.matches || coarsePointer.matches);
    };
    sync();
    queries.forEach((query) => query.addEventListener("change", sync));
    return () => {
      queries.forEach((query) => query.removeEventListener("change", sync));
    };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element || !enhanced) return;

    const stage = element.querySelector(".story-stage");
    if (!stage) return;

    const documentRoot = document.documentElement;
    let intersects = false;
    const update = () => setOnScreen(intersects && !documentRoot.hasAttribute(siteLoadingAttribute));
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      update();
    });
    const loading = new MutationObserver(update);
    observer.observe(stage);
    loading.observe(documentRoot, { attributes: true, attributeFilter: [siteLoadingAttribute] });
    return () => {
      observer.disconnect();
      loading.disconnect();
    };
  }, [enhanced]);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || !enhanced) return;
    gsap.registerPlugin(ScrollTrigger);
    const sections = Array.from(element.querySelectorAll<HTMLElement>("[data-story-chapter]"));
    const stage = element.querySelector<HTMLElement>(".story-stage");
    const playhead = { progress: 0 };
    let current = -1;

    const draw = () => {
      motion.current.progress = playhead.progress;
      const { active, copy, offset, roomPosition } = sampleStory(playhead.progress);
      stage?.style.setProperty("--story-room-position", `${roomPosition}%`);
      if (active !== current) {
        const previous = sections[current];
        const focused = document.activeElement;
        if (previous?.contains(focused)) {
          nextControl.current?.focus({ preventScroll: true });
        }
        if (current >= 0) {
          const turn = Math.PI * 2;
          motion.current.orbit = Math.round(motion.current.orbit / turn) * turn;
        }
        current = active;
        setActive(active);
        element.dataset.storyInitialized = "true";
        sections.forEach((section, index) => {
          section.inert = index !== active;
          section.toggleAttribute("data-story-visible", index === active);
        });
      }
      const section = sections[active];
      section.style.setProperty("--chapter-y", `${offset * 28}px`);
      section.style.setProperty("--chapter-opacity", String(copy));
      if (copy >= 0.95 && pendingFocus.current === active) {
        pendingFocus.current = null;
        document.getElementById(`${chapters[active].id}-title`)?.focus({ preventScroll: true });
      }
      renderRequest.current?.();
    };

    const animation = gsap.timeline({ paused: true }).to(playhead, {
      progress: 1,
      duration: 1,
      ease: "none",
      onUpdate: draw,
    });
    const trigger = ScrollTrigger.create({
      animation,
      trigger: element,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onRefresh: draw,
    });
    syncTheme.current = draw;
    draw();

    const jumpToHash = (initial = false) => {
      const chapter = chapters.find(({ id }) => window.location.hash === `#${id}`);
      const anchor = chapter && document.getElementById(chapter.id);
      if (!anchor) {
        if (initial && window.location.hash) {
          document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
        }
        return;
      }
      window.scrollTo({
        top: window.scrollY + anchor.getBoundingClientRect().top,
        behavior: "instant",
      });
      ScrollTrigger.update();
      animation.progress(trigger.progress);
    };
    jumpToHash(true);
    const onHashChange = () => jumpToHash();
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      trigger.kill();
      animation.kill();
      syncTheme.current = null;
      delete element.dataset.storyInitialized;
      stage?.style.removeProperty("--story-room-position");
      sections.forEach((section) => {
        section.inert = false;
        section.removeAttribute("data-story-visible");
        for (const property of ["y", "opacity"]) {
          section.style.removeProperty(`--chapter-${property}`);
        }
      });
    };
  }, [enhanced]);

  useEffect(() => {
    motion.current.darkTheme = theme === "dark";
    syncTheme.current?.();
  }, [theme]);

  useEffect(() => {
    const element = root.current;
    if (!enhanced || !element) return;
    const stage = element.querySelector<HTMLElement>(".story-stage");
    if (!stage) return;

    const pan = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      const bounds = element.getBoundingClientRect();
      const travel = bounds.height - stage.offsetHeight;
      if (bounds.top > 1 || bounds.top < -travel - 1) return;
      const start = window.scrollY + bounds.top;
      const step = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.offsetHeight : 1;
      const next = gsap.utils.clamp(start, start + travel, (lenis?.targetScroll ?? window.scrollY) + event.deltaX * step);
      event.preventDefault();
      if (lenis) lenis.scrollTo(next);
      else window.scrollTo({ top: next });
    };

    element.addEventListener("wheel", pan, { passive: false });
    return () => element.removeEventListener("wheel", pan);
  }, [enhanced, lenis]);

  const goToChapter = (event: MouseEvent<HTMLDivElement>) => {
    if (!enhanced || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>("[data-story-jump]");
    if (!link) return;
    const index = Number(link.dataset.storyJump);
    const chapter = chapters[index];
    const anchor = chapter && document.getElementById(chapter.id);
    if (!anchor) return;

    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, "", link.hash);
    if (index === active && sampleStory(motion.current.progress).copy >= 0.95) {
      pendingFocus.current = null;
      document.getElementById(`${chapter.id}-title`)?.focus({ preventScroll: true });
    } else {
      pendingFocus.current = index;
      nextControl.current?.focus({ preventScroll: true });
    }
    const top = window.scrollY + anchor.getBoundingClientRect().top;
    if (lenis) {
      lenis.scrollTo(top, { duration: 0.85 });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const grab = (event: PointerEvent<HTMLDivElement>) => {
    if (!ready || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointer: event.pointerId, x: event.clientX };
    event.currentTarget.dataset.dragging = "true";
  };

  const rotate = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      const bounds = event.currentTarget.getBoundingClientRect();
      motion.current.pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
      motion.current.pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
      renderRequest.current?.();
    }
    if (drag.current?.pointer !== event.pointerId) return;
    motion.current.orbit += (event.clientX - drag.current.x) * 0.012;
    drag.current.x = event.clientX;
    renderRequest.current?.();
  };

  const release = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointer !== event.pointerId) return;
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
  };

  return (
    <div
      ref={root}
      className="story-track"
      data-enhanced={enhanced ? "true" : undefined}
      data-art-ready={enhanced && ready && !failed ? "true" : undefined}
      data-active={active}
      onClick={goToChapter}
    >
      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          className="story-stop"
          id={chapter.id}
          style={{ "--chapter-stop": index / lastChapter, "--chapter-row": index + 1 } as React.CSSProperties}
          aria-hidden="true"
        />
      ))}
      <div className="story-stage" id={controlId}>
        <div className="story-studio" aria-hidden="true" />
        <div
          className="story-canvas"
          aria-hidden="true"
          onPointerDown={grab}
          onPointerMove={rotate}
          onPointerLeave={() => {
            motion.current.pointerX = motion.current.pointerY = 0;
            renderRequest.current?.();
          }}
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={release}
        >
          {enhanced && !failed && (onScreen || ready) && (
            <StorySceneBoundary onFailure={handleFailure}>
              <StoryScene
                motion={motion}
                setRenderRequest={setRenderRequest}
                visible={onScreen}
                compact={compact}
                onReady={handleReady}
                onFailure={handleFailure}
              />
            </StorySceneBoundary>
          )}
        </div>
        <div className="story-chapters">{children}</div>
        <div className="story-stage-controls story-shell">
          <p className="story-position story-label" aria-hidden="true">
            {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </p>
          <div className="story-navigation">
            {ready && !failed && (
              <Button variant="unstyled"
                className="story-orbit"
                type="button"
                aria-label="Rotate the sculpture by 45 degrees"
                onClick={() => {
                  motion.current.orbit += Math.PI / 4;
                  renderRequest.current?.();
                }}
              >
                <span aria-hidden="true"><ArrowIcon direction="clockwise" /></span> 360° view
              </Button>
            )}
            <Button as="a" variant="unstyled"
              ref={nextControl}
              className="story-next"
              href={active < lastChapter ? `#${chapters[active + 1].id}` : "#story-impact"}
              data-story-jump={active < lastChapter ? active + 1 : undefined}
            >
              {active === 0 ? "Scroll to explore" : active < lastChapter ? "Next chapter" : "Our impact"}
              <span aria-hidden="true"><ArrowIcon direction="down" /></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
