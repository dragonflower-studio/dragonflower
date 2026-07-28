"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PAIRS = [
  {
    from: "Confusion",
    to: "Conviction",
    description:
      "We turn tangled complexity into a clear point of view people can act on.",
  },
  {
    from: "Data",
    to: "Desire",
    description:
      "We move past the numbers to the human wants that make people care.",
  },
  {
    from: "Insight",
    to: "Story",
    description:
      "We shape raw understanding into a narrative that carries meaning.",
  },
  {
    from: "Noise",
    to: "Myth",
    description:
      "We cut through the noise to build the enduring story a brand is known by.",
  },
];

function ShiftArrow() {
  return (
    <svg
      className="transform_arrow-svg"
      viewBox="0 0 56 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 8H48M40.5 2L48 8L40.5 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Transformation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      const pairs = section.querySelectorAll(".transform_pair");
      gsap.set(pairs, { opacity: 0, y: "1.2em" });
      ScrollTrigger.create({
        trigger: section.querySelector(".transform_list"),
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to(pairs, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          }),
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
            {PAIRS.map((pair, index) => {
              const open = openIndex === index;
              return (
                <li
                  key={pair.from}
                  className={`transform_pair${open ? " is-open" : ""}`}
                  data-transform-pair
                >
                  <button
                    type="button"
                    className="transform_shift"
                    aria-expanded={open}
                    aria-controls={`transform-desc-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span className="transform_word is-from">{pair.from}</span>
                    <span className="transform_arrow" aria-hidden="true">
                      <ShiftArrow />
                    </span>
                    <span className="transform_to-group">
                      <span className="transform_word is-to">{pair.to}</span>
                      <span className="transform_toggle" aria-hidden="true" />
                    </span>
                  </button>
                  <div
                    className="transform_desc-wrap"
                    id={`transform-desc-${index}`}
                  >
                    <p className="transform_desc paragraph-s">
                      {pair.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
