"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PROJECTS = [
  {
    number: "01",
    client: "Ethereum",
    title: "Project Mirror",
    lead: "A research-driven reflection on how Ethereum sees itself, how others see it, and how that story shapes the ecosystem's future.",
    body: "Commissioned by Optimism and Espresso, and supported by the Ethereum Foundation, Project Mirror captured 60+ voices across the ecosystem to understand how Ethereum's identity, momentum, and myth were evolving.",
    href: "/work",
  },
  {
    number: "02",
    client: "Good Energy",
    title: "Climate Reality Check",
    lead: "A diagnostic tool revealing how climate shows up across film and television, and how it can do better.",
    body: "We mapped hundreds of scripts, storylines, and character arcs to identify narrative blind spots and the emotional levers that shape public perception, turning representation gaps into a living system of questions.",
    href: "/work",
  },
  {
    number: "03",
    client: "Plaid",
    title: "Linkless Initiative",
    lead: "A new language of trust for the future of credit.",
    body: "Through qualitative research, prototyping, and systems design, we shaped the experience and narrative around Linkless, reframing Plaid's central question from can we connect to can we be trusted.",
    href: "/work",
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
            key={project.title}
            data-work-panel
            className="work_panel"
          >
            <div className="padding-global">
              <div className="container-col-12">
                <div className="work_panel-grid">
                  <div className="work_panel-text">
                    <p className="work_client" data-work-reveal>
                      {project.client}
                    </p>

                    <h3 className="work_title-row" data-work-reveal>
                      <span className="work_number">{project.number}</span>
                      <span className="work_title heading-m">
                        {project.title}
                      </span>
                    </h3>

                    <p className="work_lead paragraph-m" data-work-reveal>
                      {project.lead}
                    </p>
                    <p className="work_body paragraph-s" data-work-reveal>
                      {project.body}
                    </p>

                    <div className="work_action" data-work-reveal>
                      <IconButton
                        href={project.href}
                        label="View project"
                        ariaLabel={`View project: ${project.title}`}
                        variant="secondary"
                      />
                    </div>
                  </div>

                  <div className="work_media" data-work-reveal aria-hidden="true">
                    <span>Project image</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
