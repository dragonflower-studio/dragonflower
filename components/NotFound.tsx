"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(SplitText);

export function NotFound() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector<HTMLElement>("[data-nf-heading]");
      const split =
        heading &&
        new SplitText(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      heading?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (split) {
        intro.fromTo(
          split.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.14 },
          0.1,
        );
      }

      intro.from(
        section.querySelectorAll("[data-nf-reveal]"),
        { y: "1.3em", opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.4,
      );
    },
    { scope: sectionRef },
  );

  return (
    <header
      ref={sectionRef}
      id="section_not-found"
      data-theme-section
      className="section_not-found theme-default"
    >
      <div className="hero-home_texture" aria-hidden="true">
        <div className="hero-home_texture-veins" />
      </div>

      <div className="padding-global">
        <div className="container-col-12">
          <div className="not-found_inner">
            <span className="not-found_code" data-nf-reveal>
              Error 404
            </span>
            <h1
              data-nf-heading
              className="not-found_heading heading-l split-pending"
            >
              This page isn&rsquo;t here.
            </h1>
            <p className="not-found_copy paragraph-m" data-nf-reveal>
              The link may be broken, or the page may have moved. Everything
              else is still where you left it.
            </p>
            <div className="not-found_action" data-nf-reveal>
              <IconButton href="/" label="Back home" ariaLabel="Back home" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
