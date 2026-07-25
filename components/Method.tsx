"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const STEPS = [
  {
    name: "Research",
    promise: "reveals the human truth",
    capabilities:
      "Qualitative interviews, landscape mapping, synthesis, workshops",
  },
  {
    name: "Narrative",
    promise: "builds the story around it",
    capabilities:
      "Positioning, architecture, storytelling, brand narrative, pitch decks",
  },
  {
    name: "Strategy",
    promise: "ensures it moves through the world",
    capabilities:
      "Narrative toolkits, playbooks, creative strategies, frameworks, campaigns",
  },
];

export function Method() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const title = section.querySelector<HTMLElement>("[data-method-title]");
      const split =
        title &&
        new SplitText(title, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      title?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (split) {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: title, start: "top 82%", once: true },
        });
      }

      gsap.from(section.querySelectorAll("[data-method-row]"), {
        y: "2em",
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".method_list"),
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_method"
      data-theme-section
      className="section_method theme-cream"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <h2
            data-method-title
            className="method_title heading-m split-pending"
          >
            The method
          </h2>

          <div className="method_list">
            {STEPS.map((step) => (
              <article
                key={step.name}
                className="method_row"
                data-method-row
              >
                <h3 className="method_name heading-s">{step.name}</h3>
                <div className="method_detail">
                  <p className="method_promise">{step.promise}</p>
                  <p className="method_caps paragraph-s">{step.capabilities}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
