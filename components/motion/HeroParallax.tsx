"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Moves each [data-depth] layer of the hero illustration at a different
 * speed while scrolling. Desktop only (fine pointer), never with reduced motion.
 */
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // The swaying wheat only starts once the page has settled, and pauses
    // whenever the hero is off screen, to spare slower phones and batteries.
    let visible = true;
    let ready = false;
    const sync = () => root.classList.toggle("hero-live", ready && visible && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(root);
    const start = () => {
      ready = true;
      sync();
    };
    const idle = (cb: () => void) =>
      typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(cb, { timeout: 4000 }) : setTimeout(cb, 1500);
    const onLoad = () => window.setTimeout(() => idle(start), 1200);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    document.addEventListener("visibilitychange", sync);
    const stopLive = () => {
      io.disconnect();
      window.removeEventListener("load", onLoad);
      document.removeEventListener("visibilitychange", sync);
    };
    if (!fine) return stopLive;

    const layers = Array.from(root.querySelectorAll<SVGGElement>("[data-depth]"));
    let raf = 0;
    const update = () => {
      const y = Math.min(window.scrollY, 900);
      for (const layer of layers) {
        const depth = Number(layer.dataset.depth || 0);
        layer.style.transform = `translate3d(0, ${(-y * depth * 0.6).toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      stopLive();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
