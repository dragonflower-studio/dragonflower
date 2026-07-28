"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        section.querySelectorAll(".showcase_img"),
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_showcase"
      data-theme-section
      className="section_showcase theme-default"
    >
      <div className="showcase_bg" aria-hidden="true">
        <Image
          src="/testimonials-desktop.webp"
          alt=""
          fill
          sizes="100vw"
          className="showcase_img is-desktop"
        />
        <Image
          src="/testimonials-mobile.webp"
          alt=""
          fill
          sizes="100vw"
          className="showcase_img is-mobile"
        />
      </div>
    </section>
  );
}
