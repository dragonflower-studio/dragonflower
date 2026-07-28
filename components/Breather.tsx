"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

type ImageField = { src: string; alt?: string };
type CtaLink = { label: string; href: string; newTab?: boolean } | null | undefined;

type BreatherProps = {
  statement?: string;
  lead?: string;
  cta?: CtaLink;
  founderName?: string;
  founderRole?: string;
  portrait?: ImageField;
};

export function Breather({
  statement,
  lead,
  cta,
  founderName,
  founderRole,
  portrait,
}: BreatherProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const statement = section.querySelector<HTMLElement>(
        "[data-breather-statement]",
      );
      const split =
        statement &&
        new SplitText(statement, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      statement?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (split && statement) {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: statement, start: "top 80%", once: true },
        });
      }

      gsap.from(section.querySelectorAll("[data-breather-reveal]"), {
        y: "1.5em",
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".breather_intro"),
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
      id="section_breather"
      data-theme-section
      className="section_breather theme-cream"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="breather_intro">
            <figure className="breather_figure" data-breather-reveal>
              <div className="breather_portrait">
                {portrait?.src && (
                  <Image
                    src={portrait.src}
                    alt={portrait.alt ?? founderName ?? ""}
                    fill
                    sizes="(max-width: 767px) 60vw, 34vw"
                    className="breather_portrait-img"
                  />
                )}
              </div>
              <figcaption className="breather_caption">
                <span className="breather_caption-name">{founderName}</span>
                <span className="breather_caption-role">{founderRole}</span>
              </figcaption>
            </figure>

            <div className="breather_intro-copy">
              <h2
                data-breather-statement
                className="breather_statement heading-m split-pending"
              >
                {statement}
              </h2>

              <p
                data-breather-lead
                data-breather-reveal
                className="breather_lead paragraph-s"
              >
                {lead}
              </p>

              {cta && (
                <div className="breather_intro-action" data-breather-reveal>
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
        </div>
      </div>
    </section>
  );
}
