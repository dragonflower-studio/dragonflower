"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

const DEFAULT_HEADING = (
  <>
    We partner with those who believe complexity deserves <em>beauty</em>.
  </>
);

type CTAProps = {
  heading?: ReactNode;
  image?: string;
  imageAlt?: string;
};

export function CTA({
  heading = DEFAULT_HEADING,
  image = "/founder.webp",
  imageAlt = "Bruno Olmedo Quiroga, founder of Dragonflower",
}: CTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const headingEl =
        section.querySelector<HTMLElement>("[data-cta-heading]");
      const split =
        headingEl &&
        new SplitText(headingEl, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      headingEl?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const start = { trigger: section, start: "top 72%", once: true } as const;

      gsap
        .timeline({ scrollTrigger: start })
        .from(section.querySelector(".cta_media"), {
          clipPath: "inset(0 0 0 100%)",
          duration: 1.1,
          ease: "expo.out",
        })
        .from(
          section.querySelector(".cta_media img"),
          { scale: 1.1, duration: 1.3, ease: "expo.out" },
          0,
        );

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
      <div className="cta_grid">
        <div className="cta_content">
          <h2 data-cta-heading className="cta_heading heading-m split-pending">
            {heading}
          </h2>

          <div className="cta_action" data-cta-reveal>
            <IconButton
              href="/contact"
              label="Let's talk"
              ariaLabel="Let's talk"
            />
          </div>
        </div>

        <figure className="cta_media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="cta_img"
          />
        </figure>
      </div>
    </section>
  );
}
