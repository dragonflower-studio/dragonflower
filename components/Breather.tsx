"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const QUOTES = [
  {
    quote:
      "This is so clear and at the same time so deep. I feel like I'm walking into a mind castle.",
    source: "Fintech Executive, CSO",
  },
  {
    quote:
      "I told my boss this wouldn't be possible. But in two sentences, it became possible.",
    source: "Fintech Legal Counsel",
  },
  {
    quote:
      "The complexity and aspiration of why we exist is perfectly captured by that sentence.",
    source: "Food & Bev Founder, CEO",
  },
];

export function Breather() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const statement = section.querySelector<HTMLElement>(
        "[data-breather-statement]",
      );
      const split =
        statement &&
        new SplitText(statement, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      statement?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (split && statement) {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: statement, start: "top 80%", once: true },
        });
      }

      gsap.from(section.querySelectorAll("[data-breather-quote]"), {
        y: "1.5em",
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".breather_quotes"),
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_breather"
      data-theme-section
      className="section_breather theme-cream"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <h2
            data-breather-statement
            className="breather_statement heading-m split-pending"
          >
            We turn complexity into clarity &mdash; without losing the magic.
          </h2>

          <span className="breather_rule" aria-hidden="true" />

          <div className="breather_quotes">
            {QUOTES.map((item) => (
              <figure
                key={item.source}
                data-breather-quote
                className="breather_quote"
              >
                <blockquote className="breather_quote-text paragraph-regular">
                  {item.quote}
                </blockquote>
                <figcaption className="breather_quote-source">
                  {item.source}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
