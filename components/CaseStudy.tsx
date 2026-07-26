"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

export type CaseStudyData = {
  id: string;
  theme: string;
  title: string;
  tagline: string;
  body: string[];
  image: { src: string; width: number; height: number; alt: string };
  href?: string;
};

export function CaseStudy({ data }: { data: CaseStudyData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const title = section.querySelector<HTMLElement>("[data-case-title]");
      const split =
        title &&
        new SplitText(title, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      title?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const frame = section.querySelector(".case_frame");
      const img = section.querySelector(".case_frame img");

      gsap
        .timeline({
          scrollTrigger: { trigger: frame, start: "top 85%", once: true },
        })
        .from(frame, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.1,
          ease: "expo.out",
        })
        .from(img, { scale: 1.08, duration: 1.3, ease: "expo.out" }, 0);

      if (split) {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: title, start: "top 84%", once: true },
        });
      }

      gsap.from(section.querySelectorAll("[data-case-reveal]"), {
        y: "1.5em",
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".case_columns"),
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={`section_case-${data.id}`}
      data-theme-section
      className={`section_case ${data.theme}`}
    >
      <div className="padding-global">
        <div className="container-col-12">
          <figure className="case_media">
            <div className="case_frame">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                sizes="(max-width: 767px) 92vw, 88vw"
                className="case_img"
              />
            </div>
          </figure>

          <h2 data-case-title className="case_title heading-m split-pending">
            {data.title}
          </h2>

          <div className="case_columns">
            <div className="case_lead-col">
              <p className="case_tagline" data-case-reveal>
                {data.tagline}
              </p>
              {data.href && (
                <div className="case_action" data-case-reveal>
                  <IconButton
                    href={data.href}
                    label="View project"
                    ariaLabel={`View project: ${data.title}`}
                    variant="secondary"
                  />
                </div>
              )}
            </div>
            <div className="case_desc">
              {data.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="case_desc-p paragraph-s"
                  data-case-reveal
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
