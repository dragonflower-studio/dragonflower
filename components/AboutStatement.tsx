"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function AboutStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const body = section.querySelector<HTMLElement>("[data-statement]");
      const split =
        body &&
        new SplitText(body, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      body?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (split) {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: body, start: "top 80%", once: true },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_about-statement"
      data-theme-section
      className="section_statement theme-cream"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="statement_inner">
            <p
              data-statement
              className="statement_body heading-m split-pending"
            >
              We study how people make sense of the world, then design the
              stories that help them see it differently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
