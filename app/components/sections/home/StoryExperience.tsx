"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
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

const StoryScene = dynamic(() => import("./StoryScene"), { ssr: false });
const motionQuery = "(prefers-reduced-motion: no-preference) and (min-height: 540px)";
const controlId = "story-stage";

export type SceneMotion = {
  progress: number;
  orbit: number;
  pointerX: number;
  pointerY: number;
  darkTheme: boolean;
};

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function StoryExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const motion = useRef<SceneMotion>({ progress: 0, orbit: 0, pointerX: 0, pointerY: 0, darkTheme: false });
  const syncTheme = useRef<(() => void) | null>(null);
  const drag = useRef<{ pointer: number; x: number } | null>(null);
  const pendingFocus = useRef<number | null>(null);
  const lenis = useLenis();
  const theme = useTheme();
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const media = window.matchMedia(motionQuery);
    const sync = () => {
      if (!media.matches) {
        setReady(false);
        setOnScreen(false);
        pendingFocus.current = null;
      }
      setEnhanced(media.matches);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element || !enhanced) return;

    const observer = new IntersectionObserver(([entry]) => {
      setOnScreen(entry.isIntersecting);
    });
    const stage = element.querySelector(".story-stage");
    if (stage) observer.observe(stage);
    return () => observer.disconnect();
  }, [enhanced]);

  useEffect(() => {
    const element = root.current;
    if (!element || !enhanced) return;
    gsap.registerPlugin(ScrollTrigger);
    const sections = Array.from(element.querySelectorAll<HTMLElement>("[data-story-chapter]"));
    const stage = element.querySelector<HTMLElement>(".story-stage");
    const playhead = { progress: 0 };
    let current = -1;
    let shown = -1;

    const draw = () => {
      motion.current.progress = playhead.progress;
      const { active, copy, offset, night } = sampleStory(playhead.progress);
      stage?.style.setProperty("--story-night", String(motion.current.darkTheme ? 1 : night));
      if (active !== current) {
        current = active;
        setActive(active);
      }
      const visible = copy > 0 ? active : -1;
      if (visible !== shown || element.dataset.storyInitialized !== "true") {
        shown = visible;
        element.dataset.storyInitialized = "true";
        sections.forEach((section, index) => {
          section.inert = index !== visible;
          section.toggleAttribute("data-story-visible", index === visible);
        });
      }
      const section = sections[active];
      const horizontal = active > 0 && active < lastChapter;
      section.style.setProperty("--chapter-x", horizontal ? `${offset * 5}%` : "0%");
      section.style.setProperty("--chapter-y", horizontal ? "0%" : `${offset * 4}%`);
      section.style.setProperty("--chapter-opacity", String(copy));
      if (copy >= 0.95 && pendingFocus.current === active) {
        pendingFocus.current = null;
        document.getElementById(`${chapters[active].id}-title`)?.focus({ preventScroll: true });
      }
    };

    const animation = gsap.to(playhead, {
      progress: 1,
      ease: "none",
      onUpdate: draw,
      scrollTrigger: {
        trigger: element,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.18,
        invalidateOnRefresh: true,
      },
    });
    syncTheme.current = draw;
    draw();

    const jumpToHash = () => {
      const chapter = chapters.find(({ id }) => window.location.hash === `#${id}`);
      const anchor = chapter && document.getElementById(chapter.id);
      if (!anchor) return;
      window.scrollTo({
        top: window.scrollY + anchor.getBoundingClientRect().top,
        behavior: "instant",
      });
      ScrollTrigger.update();
      const trigger = animation.scrollTrigger;
      trigger?.getTween()?.progress(1);
      if (trigger) animation.progress(trigger.progress);
    };
    jumpToHash();
    window.addEventListener("hashchange", jumpToHash);
    return () => {
      window.removeEventListener("hashchange", jumpToHash);
      animation.scrollTrigger?.kill();
      animation.kill();
      syncTheme.current = null;
      delete element.dataset.storyInitialized;
      stage?.style.removeProperty("--story-night");
      sections.forEach((section) => {
        section.inert = false;
        section.removeAttribute("data-story-visible");
        for (const property of ["x", "y", "opacity"]) {
          section.style.removeProperty(`--chapter-${property}`);
        }
      });
    };
  }, [enhanced]);

  const graphite = theme === "dark" || active % 2 === 1;
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
      root.current?.querySelector<HTMLAnchorElement>(`.story-rail [data-story-jump="${index}"]`)?.focus({ preventScroll: true });
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
    }
    if (drag.current?.pointer !== event.pointerId) return;
    motion.current.orbit += (event.clientX - drag.current.x) * 0.012;
    drag.current.x = event.clientX;
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
      data-graphite={graphite ? "true" : undefined}
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
        <div
          className="story-canvas"
          aria-hidden="true"
          onPointerDown={grab}
          onPointerMove={rotate}
          onPointerLeave={() => { motion.current.pointerX = motion.current.pointerY = 0; }}
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={release}
        >
          {enhanced && !failed && (
            <SceneBoundary onFailure={handleFailure}>
              <StoryScene
                motion={motion}
                visible={onScreen}
                onReady={handleReady}
                onFailure={handleFailure}
              />
            </SceneBoundary>
          )}
        </div>
        <div className="story-chapters">{children}</div>
        <nav className="story-rail" aria-label="Story chapters">
          {chapters.map((chapter, index) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              data-story-jump={index}
              aria-current={index === active ? "step" : undefined}
              aria-label={chapter.name}
              title={chapter.name}
            >
              <span />
            </a>
          ))}
        </nav>
        <div className="story-stage-controls story-shell">
          <p className="story-position story-label" aria-hidden="true">
            {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </p>
          <div className="story-navigation">
            {ready && !failed && (
              <button
                className="story-orbit"
                type="button"
                aria-label="Rotate the sculpture by 45 degrees"
                onClick={() => { motion.current.orbit += Math.PI / 4; }}
              >
                <span aria-hidden="true">↻</span> 360° view
              </button>
            )}
            <a
              className="story-next"
              href={active < lastChapter ? `#${chapters[active + 1].id}` : "#story-impact"}
              data-story-jump={active < lastChapter ? active + 1 : undefined}
            >
              {active === 0 ? "Scroll to explore" : active < lastChapter ? "Next chapter" : "Our impact"}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
