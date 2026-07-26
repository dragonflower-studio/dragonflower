"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export type SnapshotsData = {
  heading: string;
  caption: string;
  images: { src: string; width: number; height: number; alt: string }[];
};

export function ProjectSnapshots({ heading, caption, images }: SnapshotsData) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const title = section.querySelector<HTMLElement>("[data-snap-title]");
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

      gsap.from(section.querySelectorAll("[data-snap-reveal]"), {
        y: "1.5em",
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".snapshots_caption"),
          start: "top 84%",
          once: true,
        },
      });

      gsap.from(section.querySelectorAll(".snapshots_frame"), {
        clipPath: "inset(0 0 100% 0)",
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section.querySelector(".snapshots_grid"),
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_snapshots"
      data-theme-section
      className="section_snapshots theme-default"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <h2
            data-snap-title
            className="snapshots_heading heading-m split-pending"
          >
            {heading}
          </h2>
          <p className="snapshots_caption paragraph-s" data-snap-reveal>
            {caption}
          </p>

          <div className="snapshots_grid">
            {images.map((image) => (
              <figure key={image.src} className="snapshots_item">
                <div className="snapshots_frame">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 767px) 92vw, 54vw"
                    className="snapshots_img"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
