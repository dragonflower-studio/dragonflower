"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(ScrollTrigger);

const PRACTICES = [
  {
    number: "01",
    title: "Research",
    promise: "We uncover the truths that move people and systems.",
    body: "Through deep qualitative work — interviews, synthesis, landscape mapping — we reveal the human tensions behind complex change.",
    theme: "theme-plum",
    landscape: "/practice-research-landscape.webp",
  },
  {
    number: "02",
    title: "Narrative",
    promise: "We translate insight into clarity and conviction.",
    body: "We craft the story that aligns teams, inspires audiences, and makes belief possible through positioning, architecture, and brand narrative.",
    theme: "theme-cream",
    landscape: "/practice-narrative-landscape.webp",
  },
  {
    number: "03",
    title: "Strategy",
    promise: "We design how ideas move through the world.",
    body: "From frameworks to expressions, we build systems that make the story tangible — through creative strategy, narrative toolkits, playbooks, and more.",
    theme: "theme-violet",
    landscape: "/practice-strategy-landscape.webp",
  },
];

export function Practice() {
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
              Our work sits at the intersection of inquiry and imagination
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
                      One studio, three practices.
                    </h3>

                    <ul className="practice-overview">
                      {PRACTICES.map((item) => (
                        <li key={item.number} className="practice-overview_item">
                          <span className="practice-overview_number">
                            {item.number}
                          </span>
                          <span className="practice-overview_title">
                            {item.title}
                          </span>
                          <span className="practice-overview_promise">
                            {item.promise}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>

                {PRACTICES.map((item) => (
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
                          <Image
                            src={item.landscape}
                            alt=""
                            fill
                            sizes="(max-width: 767px) 90vw, 30vw"
                            className="practice-card_media-img"
                          />
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
