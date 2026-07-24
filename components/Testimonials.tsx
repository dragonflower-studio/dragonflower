"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    quote:
      "This is so clear and at the same time so deep. I feel like I'm walking into a mind castle.",
    source: "Fintech Executive, CSO",
  },
  {
    quote:
      "I told my boss this wouldn't be possible. But in two sentences, it became possible.",
    source: "Fintech Legal Counsel",
  },
  {
    quote:
      "The complexity and aspiration of why we exist is perfectly captured by that sentence.",
    source: "Food & Bev Founder, CEO",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(section.querySelectorAll("[data-testimonial]"), {
        y: "1.75em",
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section.querySelector(".testimonials_quotes"),
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_testimonials"
      data-theme-section
      className="section_testimonials theme-default"
    >
      <div className="testimonials_bg" aria-hidden="true">
        <Image
          src="/testimonials-desktop.webp"
          alt=""
          fill
          sizes="100vw"
          className="testimonials_bg-img is-desktop"
        />
        <Image
          src="/testimonials-mobile.webp"
          alt=""
          fill
          sizes="100vw"
          className="testimonials_bg-img is-mobile"
        />
      </div>
      <div className="testimonials_scrim" aria-hidden="true" />

      <div className="padding-global">
        <div className="container-col-12">
          <div className="testimonials_quotes">
            {QUOTES.map((item) => (
              <figure
                key={item.source}
                data-testimonial
                className="testimonials_quote"
              >
                <blockquote className="testimonials_quote-text paragraph-m">
                  {item.quote}
                </blockquote>
                <figcaption className="testimonials_quote-source">
                  {item.source}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
