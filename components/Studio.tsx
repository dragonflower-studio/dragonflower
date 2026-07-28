"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const STUDIO_LEAD =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const STUDIO_BODY =
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.";

const FOUNDER_BIO =
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.";

export function Studio() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector<HTMLElement>("[data-studio-title]");
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
          scrollTrigger: { trigger: heading, start: "top 82%", once: true },
        });
      }

      gsap.from(section.querySelectorAll("[data-studio-reveal]"), {
        y: "1.5em",
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".studio_grid"),
          start: "top 80%",
          once: true,
        },
      });

      const figure = section.querySelector(".studio_figure");
      const portrait = section.querySelector(".studio_portrait");
      const portraitImg = section.querySelector(".studio_portrait img");

      gsap
        .timeline({
          scrollTrigger: { trigger: figure, start: "top 82%", once: true },
        })
        .from(portrait, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.1,
          ease: "expo.out",
        })
        .from(
          portraitImg,
          { scale: 1.16, duration: 1.3, ease: "expo.out" },
          0,
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_studio"
      data-theme-section
      className="section_studio theme-cream"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="studio_head">
            <h2
              data-studio-title
              className="studio_title heading-m split-pending"
            >
              The studio
            </h2>
          </div>

          <div className="studio_grid">
            <div className="studio_col-text">
              <p className="studio_lead paragraph-l" data-studio-reveal>
                {STUDIO_LEAD}
              </p>
              <p className="studio_body paragraph-s" data-studio-reveal>
                {STUDIO_BODY}
              </p>
              <p className="studio_founder-bio paragraph-s" data-studio-reveal>
                {FOUNDER_BIO}
              </p>
            </div>

            <figure className="studio_figure">
              <div className="studio_portrait">
                <Image
                  src="/founder.webp"
                  alt="Portrait of Bruno Olmedo Quiroga, founder of Dragonflower"
                  fill
                  sizes="(max-width: 767px) 100vw, 40vw"
                  className="studio_portrait-img"
                />
              </div>
              <figcaption className="studio_caption" data-studio-reveal>
                <span className="studio_caption-name">
                  Bruno Olmedo Quiroga
                </span>
                <span className="studio_caption-role">Founder</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
