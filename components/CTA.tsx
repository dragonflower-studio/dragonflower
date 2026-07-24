"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector<HTMLElement>("[data-cta-heading]");
      const split =
        heading &&
        new SplitText(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      heading?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });

      if (split) {
        timeline.from(split.lines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
        });
      }

      timeline.from(
        section.querySelectorAll("[data-cta-reveal]"),
        { y: "1.5em", opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_cta"
      data-theme-section
      className="section_cta theme-plum"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="cta_inner">
            <h2
              data-cta-heading
              className="cta_heading heading-m split-pending"
            >
              We partner with those who believe complexity deserves{" "}
              <em>beauty</em>.
            </h2>

            <div className="cta_action" data-cta-reveal>
              <IconButton
                href="/contact"
                label="Let's talk"
                ariaLabel="Let's talk"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
