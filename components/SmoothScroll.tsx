"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMountEffect } from "@/hooks/useMountEffect";

gsap.registerPlugin(ScrollTrigger);

const SMOOTH_SCROLL_MIN_WIDTH = "(min-width: 768px)";

export function SmoothScroll() {
  useMountEffect(() => {
    if (!window.matchMedia(SMOOTH_SCROLL_MIN_WIDTH).matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  });

  return null;
}
