"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

type WorkHeroProps = {
  title?: string;
  sub?: string;
};

export function WorkHero({ title, sub }: WorkHeroProps = {}) {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const heading = hero.querySelector<HTMLElement>("[data-work-heading]");
      const sub = hero.querySelector<HTMLElement>("[data-work-sub]");

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
    },
    { scope: heroRef },
  );

  return (
    <header
      ref={heroRef}
      id="section_work-hero"
      data-theme-section
      className="section_work-hero theme-default"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="work-hero_inner">
            <h1
              data-work-heading
              className="work-hero_title heading-xl split-pending"
            >
              {title}
            </h1>
            <p
              data-work-sub
              className="work-hero_sub paragraph-m split-pending"
            >
              {sub}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
