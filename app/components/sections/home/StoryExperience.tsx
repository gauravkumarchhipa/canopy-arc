"use client";

import dynamic from "next/dynamic";
import {
  Component,
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

const StoryScene = dynamic(() => import("./StoryScene"), { ssr: false });
const motionQuery = "(prefers-reduced-motion: no-preference) and (min-height: 540px)";
const controlId = "story-stage";

export type SceneMotion = { chapter: number; orbit: number; night: number };

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
  const motion = useRef<SceneMotion>({ chapter: 0, orbit: 0, night: 0 });
  const drag = useRef<{ pointer: number; x: number } | null>(null);
  const pendingFocus = useRef<number | null>(null);
  const lenis = useLenis();
  const theme = useTheme();
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const [loadScene, setLoadScene] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(motionQuery);
    const sync = () => {
      if (!media.matches) setReady(false);
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
      if (!entry.isIntersecting) return;
      setLoadScene(true);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [enhanced]);

  useEffect(() => {
    const element = root.current;
    if (!element || !enhanced) return;
    gsap.registerPlugin(ScrollTrigger);
    const sections = Array.from(element.querySelectorAll<HTMLElement>("[data-story-chapter]"));
    const playhead = { chapter: 0 };
    let current = -1;

    const draw = () => {
      const { chapter } = playhead;
      motion.current.chapter = chapter;
      const settled = Math.round(chapter);
      if (settled !== current) {
        current = settled;
        setActive(settled);
      }
      sections.forEach((section, index) => {
        const distance = index - chapter;
        const horizontal = index > 0 && index < lastChapter;
        const turn = Math.abs(distance);
        const offset = Math.sign(distance) * Math.max(0, turn - 0.14);
        section.inert = index !== settled;
        section.style.setProperty("--chapter-x", horizontal ? `${offset * 68}%` : "0%");
        section.style.setProperty("--chapter-y", horizontal ? "0%" : `${offset * 30}%`);
        const fade = gsap.utils.clamp(0, 1, (turn - 0.22) / 0.42);
        section.style.setProperty("--chapter-opacity", String(1 - fade * fade * (3 - 2 * fade)));
        section.style.setProperty("--chapter-visibility", turn < 0.7 ? "visible" : "hidden");
      });
    };

    const animation = gsap.to(playhead, {
      chapter: lastChapter,
      ease: "none",
      onUpdate: draw,
      scrollTrigger: {
        trigger: element,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        invalidateOnRefresh: true,
      },
    });
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
    };
    jumpToHash();
    window.addEventListener("hashchange", jumpToHash);
    return () => {
      window.removeEventListener("hashchange", jumpToHash);
      animation.scrollTrigger?.kill();
      animation.kill();
      sections.forEach((section) => {
        section.inert = false;
        for (const property of ["x", "y", "opacity", "visibility"]) {
          section.style.removeProperty(`--chapter-${property}`);
        }
      });
    };
  }, [enhanced]);

  const graphite = theme === "dark" || active % 2 === 1;
  useEffect(() => {
    motion.current.night = graphite ? 1 : 0;
  }, [graphite]);

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

  useEffect(() => {
    if (pendingFocus.current !== active) return;
    pendingFocus.current = null;
    document.getElementById(`${chapters[active].id}-title`)?.focus({ preventScroll: true });
  }, [active]);

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
    if (index === active) {
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
      data-art-failed={failed ? "true" : undefined}
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
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={release}
        >
          {enhanced && loadScene && !failed && (
            <SceneBoundary onFailure={() => setFailed(true)}>
              <StoryScene
                motion={motion}
                visible={onScreen}
                onReady={() => setReady(true)}
                onFailure={() => setFailed(true)}
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
