"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PAIRS = [
  { from: "Confusion", to: "Conviction" },
  { from: "Data", to: "Desire" },
  { from: "Insight", to: "Story" },
  { from: "Noise", to: "Myth" },
];

function Chevron() {
  return (
    <svg viewBox="0 0 8 12" fill="none" aria-hidden="true">
      <path
        d="M1.5 1L6.5 6L1.5 11"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Transformation() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector<HTMLElement>(
        "[data-transform-heading]",
      );
      const split =
        heading &&
        new SplitText(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      heading?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (split) {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: heading, start: "top 80%", once: true },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-transform-pair]").forEach((pair) => {
        const from = pair.querySelector(".transform_word.is-from");
        const line = pair.querySelector("[data-arrow-line]");
        const head = pair.querySelector("[data-arrow-head]");
        const to = pair.querySelector(".transform_word.is-to");

        gsap
          .timeline({
            scrollTrigger: { trigger: pair, start: "top 82%", once: true },
          })
          .from(from, { opacity: 0, x: "-0.4em", duration: 0.6, ease: "power3.out" })
          .from(line, { scaleX: 0, duration: 0.55, ease: "power2.inOut" }, "-=0.2")
          .from(
            head,
            { opacity: 0, x: "-0.5em", duration: 0.35, ease: "power2.out" },
            "-=0.1",
          )
          .from(
            to,
            { opacity: 0, x: "-0.4em", duration: 0.6, ease: "power3.out" },
            "-=0.15",
          );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_transform"
      data-theme-section
      className="section_transform theme-surface"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <h2
            data-transform-heading
            className="transform_heading heading-s split-pending"
          >
            We believe clarity is an act of creation that shifts reality
          </h2>

          <ul className="transform_list">
            {PAIRS.map((pair) => (
              <li
                key={pair.from}
                className="transform_pair"
                data-transform-pair
              >
                <span className="transform_word is-from">{pair.from}</span>
                <span className="transform_arrow" aria-hidden="true">
                  <span className="transform_arrow-line" data-arrow-line />
                  <span className="transform_arrow-head" data-arrow-head>
                    <Chevron />
                  </span>
                </span>
                <span className="transform_word is-to">{pair.to}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
