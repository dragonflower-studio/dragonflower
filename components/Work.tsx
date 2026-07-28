"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

type WorkLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  scale?: number;
};

type WorkProject = {
  header: string;
  subheader: string;
  logos: WorkLogo[];
  href: string;
  image: string;
};

const PROJECTS: WorkProject[] = [
  {
    header:
      "Understanding Ethereum's current narrative tensions and opportunities",
    subheader: "Project Mirror",
    logos: [
      {
        src: "/logos/ethereum.png",
        alt: "Ethereum Foundation",
        width: 5000,
        height: 1536,
      },
      {
        src: "/logos/espresso.webp",
        alt: "Espresso",
        width: 780,
        height: 227,
      },
    ],
    href: "/work/ethereum",
    image: "/work-ethereum.webp",
  },
  {
    header:
      "Revealing how climate shows up across film and television, and how it can do better",
    subheader: "Climate Reality Check",
    logos: [
      {
        src: "/logos/good-energy.png",
        alt: "Good Energy",
        width: 200,
        height: 200,
        scale: 1.4,
      },
    ],
    href: "/work",
    image: "/good-energy.webp",
  },
  {
    header: "A new language of trust for the future of credit",
    subheader: "Linkless Initiative",
    logos: [
      {
        src: "/logos/plaid.png",
        alt: "Plaid",
        width: 1280,
        height: 483,
      },
    ],
    href: "/work",
    image: "/work-plaid.webp",
  },
];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector<HTMLElement>("[data-work-heading]");
      const split =
        heading &&
        new SplitText(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      heading?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (split && heading) {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: heading, start: "top 82%", once: true },
        });
      }

      section
        .querySelectorAll<HTMLElement>("[data-work-panel]")
        .forEach((panel) => {
          gsap.from(panel.querySelectorAll("[data-work-reveal]"), {
            y: "1.75em",
            opacity: 0,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 62%", once: true },
          });
        });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_work"
      data-theme-section
      className="section_work theme-surface"
    >
      <div className="work_intro">
        <div className="padding-global">
          <div className="container-col-12">
            <h2
              data-work-heading
              className="work_heading heading-m split-pending"
            >
              Selected work
            </h2>
          </div>
        </div>
      </div>

      <div className="work_stack">
        {PROJECTS.map((project) => (
          <article
            key={project.subheader}
            data-work-panel
            className="work_panel"
          >
            <div className="padding-global">
              <div className="container-col-12">
                <div className="work_panel-grid">
                  <div className="work_panel-text">
                    <div className="work_logos" data-work-reveal>
                      {project.logos.map((logo) => (
                        <Image
                          key={logo.src}
                          src={logo.src}
                          alt={logo.alt}
                          width={logo.width}
                          height={logo.height}
                          className="work_logo"
                          style={
                            {
                              "--logo-scale": logo.scale ?? 1,
                            } as CSSProperties
                          }
                        />
                      ))}
                    </div>

                    <h3 className="work_header heading-xs" data-work-reveal>
                      {project.header}
                    </h3>

                    <p className="work_subheader" data-work-reveal>
                      {project.subheader}
                    </p>

                    <div className="work_action" data-work-reveal>
                      <IconButton
                        href={project.href}
                        label="View project"
                        ariaLabel={`View project: ${project.subheader}`}
                        variant="secondary"
                      />
                    </div>
                  </div>

                  {project.image ? (
                    <div className="work_media" data-work-reveal>
                      <Image
                        src={project.image}
                        alt={project.subheader}
                        fill
                        sizes="(max-width: 767px) 90vw, 42vw"
                        className="work_media-img"
                      />
                    </div>
                  ) : (
                    <div
                      className="work_media is-placeholder"
                      data-work-reveal
                      aria-hidden="true"
                    >
                      <span>Project image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
