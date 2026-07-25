"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(SplitText);

export function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const heading = hero.querySelector<HTMLElement>("[data-about-heading]");
      const copy = hero.querySelector<HTMLElement>("[data-about-copy]");

      const headingSplit =
        heading &&
        new SplitText(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });
      const copySplit =
        copy &&
        new SplitText(copy, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      heading?.classList.remove("split-pending");
      copy?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (headingSplit) {
        intro.fromTo(
          headingSplit.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.14 },
          0.15,
        );
      }

      if (copySplit) {
        intro.fromTo(
          copySplit.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.12 },
          0.4,
        );
      }

      intro.from(
        hero.querySelectorAll("[data-about-reveal]"),
        { y: "1.4em", opacity: 0, duration: 0.8, ease: "power3.out" },
        0.55,
      );
    },
    { scope: heroRef },
  );

  return (
    <header
      ref={heroRef}
      id="section_about-hero"
      data-theme-section
      className="section_about-hero theme-default"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="about-hero_inner">
            <h1
              data-about-heading
              className="about-hero_title heading-xl split-pending"
            >
              Change requires belief. Belief requires clarity.
            </h1>

            <p
              data-about-copy
              className="about-hero_copy paragraph-m split-pending"
            >
              Dragonflower was born to humanize complexity that has the power to
              change the world.
            </p>

            <div className="about-hero_action" data-about-reveal>
              <IconButton
                href="/contact"
                label="Let's work together"
                ariaLabel="Let's work together"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
