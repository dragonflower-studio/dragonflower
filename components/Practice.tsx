"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(ScrollTrigger);

type PracticeCard = {
  number: string;
  title: string;
  promise: string;
  body: string;
  theme: string;
  landscape: { src: string; alt?: string };
};

type PracticeProps = {
  practices?: PracticeCard[];
  introHeading?: string;
  overviewStatement?: string;
  overviewBody?: string;
};

export function Practice({
  practices,
  introHeading,
  overviewStatement,
  overviewBody,
}: PracticeProps = {}) {
  const items = practices ?? [];
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const pin = section.querySelector<HTMLElement>("[data-practice-pin]");
      const list = section.querySelector<HTMLElement>("[data-practice-list]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-practice-card]");
      if (!pin || !list || cards.length === 0) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const readStep = (name: string) =>
        parseFloat(getComputedStyle(list).getPropertyValue(name)) || 0;

      let stepY = 0;
      let stepZ = 0;
      let exitY = 0;

      const measure = () => {
        stepY = readStep("--stack-step-y");
        stepZ = readStep("--stack-step-z");
        const listHeight = list.getBoundingClientRect().height;
        exitY = (window.innerHeight + listHeight) / 2 + stepY;
      };

      const layout = (position: number) => {
        cards.forEach((card, index) => {
          const depth = index - position;
          const gone = Math.min(1, Math.max(0, -depth));
          gsap.set(card, {
            y: gone > 0 ? -gone * exitY : depth * stepY,
            z: gone > 0 ? 0 : depth * -stepZ,
            zIndex: cards.length - index,
          });
        });
      };

      const state = { position: 0 };
      measure();
      layout(0);

      const tween = gsap.to(state, {
        position: cards.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            layout(state.position);
          },
        },
        onUpdate: () => layout(state.position),
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_practice"
      data-theme-section
      className="section_practice theme-default"
    >
      <div className="practice_intro">
        <div className="padding-global">
          <div className="container-col-12">
            <h2 className="heading-m practice_intro-heading">
              {introHeading}
            </h2>
          </div>
        </div>
      </div>

      <div className="practice_pin" data-practice-pin>
        <div className="practice_sticky">
          <div className="padding-global">
            <div className="container-col-12">
              <div className="practice_list" data-practice-list>
                <article
                  data-practice-card
                  className="practice_item theme-surface"
                >
                  <div className="practice-card is-overview">
                    <h3 className="practice-card_statement heading-s">
                      {overviewStatement}
                    </h3>

                    <div className="practice-overview_grid">
                      <div className="practice-cycle">
                        <svg
                          className="practice-cycle_ring"
                          viewBox="0 0 200 200"
                          fill="none"
                          aria-hidden="true"
                        >
                          <defs>
                            <marker
                              id="practice-cycle-head"
                              viewBox="0 0 12 12"
                              refX="9"
                              refY="6"
                              markerWidth="11"
                              markerHeight="11"
                              markerUnits="userSpaceOnUse"
                              orient="auto"
                            >
                              <path
                                d="M2.5 2L9 6L2.5 10"
                                fill="none"
                                stroke="var(--theme-accent)"
                                strokeWidth="1.4"
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                              />
                            </marker>
                          </defs>
                          <path
                            className="practice-cycle_arc"
                            markerEnd="url(#practice-cycle-head)"
                            d="M124.7 23.9 A80 80 0 0 1 178.3 116.6"
                          />
                          <path
                            className="practice-cycle_arc"
                            markerEnd="url(#practice-cycle-head)"
                            d="M153.5 159.5 A80 80 0 0 1 46.5 159.5"
                          />
                          <path
                            className="practice-cycle_arc"
                            markerEnd="url(#practice-cycle-head)"
                            d="M21.7 116.6 A80 80 0 0 1 75.3 23.9"
                          />
                        </svg>
                        <span className="practice-cycle_node is-research">
                          Research
                        </span>
                        <span className="practice-cycle_node is-strategy">
                          Strategy
                        </span>
                        <span className="practice-cycle_node is-narrative">
                          Narrative
                        </span>
                      </div>

                      {overviewBody && (
                        <p className="practice-overview_body paragraph-s">
                          {overviewBody}
                        </p>
                      )}
                    </div>
                  </div>
                </article>

                {items.map((item) => (
                  <article
                    key={item.number}
                    data-practice-card
                    className={`practice_item ${item.theme}`}
                  >
                    <div className="practice-card">
                      <div className="practice-card_index">
                        <span className="practice-card_number">
                          {item.number}
                        </span>
                        <h3 className="practice-card_label">{item.title}</h3>
                        <span className="practice-card_rule" aria-hidden="true" />
                      </div>

                      <div className="practice-card_main">
                        <p className="practice-card_statement heading-s">
                          {item.promise}
                        </p>

                        <div className="practice-card_media is-landscape">
                          {item.landscape?.src && (
                            <Image
                              src={item.landscape.src}
                              alt={item.landscape.alt ?? ""}
                              fill
                              sizes="(max-width: 767px) 90vw, 30vw"
                              className="practice-card_media-img"
                            />
                          )}
                        </div>

                        <div className="practice-card_aside">
                          <p className="paragraph-s">{item.body}</p>
                          <IconButton
                            href="/practice"
                            label="Explore"
                            variant="secondary"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
