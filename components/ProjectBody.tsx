"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export type Chapter = {
  label: string;
  lead?: string;
  emphasis?: string;
  paragraphs: string[];
  quotes?: string[];
};

export function ProjectBody({ chapters }: { chapters: Chapter[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      section.querySelectorAll<HTMLElement>(".project-chapter").forEach((chapter) => {
        gsap.from(chapter.querySelectorAll("[data-chapter-reveal]"), {
          y: "1.5em",
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: chapter, start: "top 78%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_project-body"
      data-theme-section
      className="section_project-body theme-cream"
    >
      <div className="padding-global">
        <div className="container-col-12">
          {chapters.map((chapter) => (
            <div key={chapter.label} className="project-chapter">
              <h2 className="project-chapter_label heading-s" data-chapter-reveal>
                {chapter.label}
              </h2>

              <div className="project-chapter_body">
                {chapter.lead && (
                  <p className="project-chapter_lead" data-chapter-reveal>
                    {chapter.lead}
                  </p>
                )}
                {chapter.emphasis && (
                  <p className="project-chapter_emph" data-chapter-reveal>
                    {chapter.emphasis}
                  </p>
                )}
                {chapter.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="project-chapter_p paragraph-s"
                    data-chapter-reveal
                  >
                    {paragraph}
                  </p>
                ))}

                {chapter.quotes && (
                  <div className="project-quotes">
                    {chapter.quotes.map((quote, index) => (
                      <blockquote
                        key={index}
                        className="project-quote"
                        data-chapter-reveal
                      >
                        <p className="project-quote_text">{quote}</p>
                      </blockquote>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
