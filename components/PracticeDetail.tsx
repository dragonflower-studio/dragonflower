"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export type PracticeData = {
  number: string;
  title: string;
  theme: string;
  promise: string;
  overview: string[];
  approach: { title: string; body: string }[];
  capabilities: string[];
  deliverables: string[];
  image: { src: string; alt: string };
};

export function PracticeDetail({ data }: { data: PracticeData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const title = section.querySelector<HTMLElement>("[data-practice-title]");
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
          scrollTrigger: { trigger: title, start: "top 85%", once: true },
        });
      }

      const frame = section.querySelector(".practice-split_frame");
      const img = section.querySelector(".practice-split_frame img");

      gsap.from(frame, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: frame, start: "top 82%", once: true },
      });

      gsap.fromTo(
        img,
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      const revealGroup = (selector: string, triggerSelector: string) => {
        const els = section.querySelectorAll(selector);
        const trigger = section.querySelector(triggerSelector);
        if (!els.length || !trigger) return;
        gsap.from(els, {
          y: "2em",
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger, start: "top 80%", once: true },
        });
      };

      revealGroup("[data-reveal-content]", ".practice-split_promise");
      revealGroup("[data-reveal-approach]", ".practice-split_approach-grid");
      revealGroup("[data-reveal-lists]", ".practice-split_lists");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={`section_practice-${data.title.toLowerCase()}`}
      data-theme-section
      className={`section_practice-detail ${data.theme}`}
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="practice-split">
            <div className="practice-split_media">
              <div className="practice-split_head">
                <span className="practice-split_number">{data.number}</span>
                <h2
                  data-practice-title
                  className="practice-split_title heading-l split-pending"
                >
                  {data.title}
                </h2>
              </div>
              <figure className="practice-split_frame">
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  fill
                  sizes="(max-width: 767px) 92vw, 42vw"
                  className="practice-split_img"
                />
              </figure>
            </div>

            <div className="practice-split_content">
              <p className="practice-split_promise" data-reveal-content>
                {data.promise}
              </p>

              <div className="practice-split_overview" data-reveal-content>
                {data.overview.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? "practice-split_lead paragraph-m"
                        : "practice-split_text paragraph-s"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="practice-split_approach">
                <span className="practice-split_label">Approach</span>
                <div className="practice-split_approach-grid">
                  {data.approach.map((item, index) => (
                    <div
                      key={item.title}
                      className="practice-split_approach-item"
                      data-reveal-approach
                    >
                      <span className="practice-split_approach-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="practice-split_approach-copy">
                        <h3 className="practice-split_approach-title">
                          {item.title}
                        </h3>
                        <p className="practice-split_approach-body paragraph-s">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="practice-split_lists">
                <div className="practice-split_list" data-reveal-lists>
                  <span className="practice-split_label">Capabilities</span>
                  <ul className="practice-split_list-items">
                    {data.capabilities.map((item) => (
                      <li key={item} className="practice-split_list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="practice-split_list" data-reveal-lists>
                  <span className="practice-split_label">Deliverables</span>
                  <ul className="practice-split_list-items">
                    {data.deliverables.map((item) => (
                      <li key={item} className="practice-split_list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
