"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Step = { name: string; promise?: string; capabilities?: string };
type CtaLink = { label: string; href: string; newTab?: boolean } | null | undefined;

type MethodProps = {
  title?: string;
  steps?: Step[];
  cta?: CtaLink;
};

export function Method({ title, steps, cta }: MethodProps = {}) {
  const items = steps ?? [];
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
            {title}
          </h2>

          <div className="method_list">
            {items.map((step) => (
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

          {cta && (
            <div className="method_action" data-method-row>
              <IconButton
                href={cta.href}
                label={cta.label}
                variant="secondary"
                newTab={cta.newTab}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
