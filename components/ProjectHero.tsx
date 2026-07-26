"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

export type ProjectHeroData = {
  title: string;
  tagline: string;
  collaborators: string;
  image: { src: string; width: number; height: number; alt: string };
};

export function ProjectHero({ title, tagline, collaborators, image }: ProjectHeroData) {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const titleEl = hero.querySelector<HTMLElement>("[data-ph-title]");
      const taglineEl = hero.querySelector<HTMLElement>("[data-ph-tagline]");

      const titleSplit =
        titleEl &&
        new SplitText(titleEl, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });
      const taglineSplit =
        taglineEl &&
        new SplitText(taglineEl, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      titleEl?.classList.remove("split-pending");
      taglineEl?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (titleSplit) {
        intro.fromTo(
          titleSplit.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.14 },
          0.1,
        );
      }
      if (taglineSplit) {
        intro.fromTo(
          taglineSplit.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.1 },
          0.35,
        );
      }
      intro.from(
        hero.querySelectorAll("[data-ph-reveal]"),
        { y: "1.4em", opacity: 0, duration: 0.8, ease: "power3.out" },
        0.5,
      );

      const frame = hero.querySelector(".project-hero_frame");
      const img = hero.querySelector(".project-hero_frame img");
      intro
        .from(frame, { clipPath: "inset(0 0 100% 0)", duration: 1.1 }, 0.5)
        .from(img, { scale: 1.08, duration: 1.3 }, "<");
    },
    { scope: heroRef },
  );

  return (
    <header
      ref={heroRef}
      id="section_project-hero"
      data-theme-section
      className="section_project-hero theme-default"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="project-hero_head">
            <h1
              data-ph-title
              className="project-hero_title heading-l split-pending"
            >
              {title}
            </h1>
            <p
              data-ph-tagline
              className="project-hero_tagline paragraph-l split-pending"
            >
              {tagline}
            </p>
            <p className="project-hero_meta paragraph-s" data-ph-reveal>
              {collaborators}
            </p>
          </div>

          <figure className="project-hero_media" data-ph-reveal>
            <div className="project-hero_frame">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                priority
                className="project-hero_img"
              />
            </div>
          </figure>
        </div>
      </div>
    </header>
  );
}
