"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

type PracticeHeroProps = {
  meta?: string;
  title?: string;
  sub?: string;
};

export function PracticeHero({ meta, title, sub }: PracticeHeroProps = {}) {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const heading = hero.querySelector<HTMLElement>("[data-practice-heading]");
      const sub = hero.querySelector<HTMLElement>("[data-practice-sub]");

      const headingSplit =
        heading &&
        new SplitText(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });
      const subSplit =
        sub &&
        new SplitText(sub, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      heading?.classList.remove("split-pending");
      sub?.classList.remove("split-pending");

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
      if (subSplit) {
        intro.fromTo(
          subSplit.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.12 },
          0.42,
        );
      }
      intro.from(
        hero.querySelector(".practice-hero_meta"),
        { y: "1.2em", opacity: 0, duration: 0.8, ease: "power3.out" },
        0.55,
      );
    },
    { scope: heroRef },
  );

  return (
    <header
      ref={heroRef}
      id="section_practice-hero"
      data-theme-section
      className="section_practice-hero theme-default"
    >
      <div className="hero-home_texture" aria-hidden="true">
        <div className="hero-home_texture-veins" />
      </div>

      <div className="padding-global">
        <div className="container-col-12">
          <div className="practice-hero_inner">
            <span className="practice-hero_meta">{meta}</span>
            <h1
              data-practice-heading
              className="practice-hero_title heading-xl split-pending"
            >
              {title}
            </h1>
            <p
              data-practice-sub
              className="practice-hero_sub paragraph-m split-pending"
            >
              {sub}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
