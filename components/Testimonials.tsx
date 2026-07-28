"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMountEffect } from "@/hooks/useMountEffect";
import { IconButton } from "@/components/IconButton";

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

const AUTOPLAY_MS = 6000;
const SLIDE_DURATION = 0.9;

function ChevronLeft() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 2L4 8L10 14"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 2L12 8L6 14"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = QUOTES.length;
  const slides = [...QUOTES, QUOTES[0]];

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const slideWidth = () =>
    viewportRef.current?.getBoundingClientRect().width ?? 0;

  const animateTo = (position: number, onDone?: () => void) => {
    gsap.to(trackRef.current, {
      x: -position * slideWidth(),
      duration: reduced() ? 0 : SLIDE_DURATION,
      ease: "power3.inOut",
      overwrite: true,
      onComplete: onDone,
    });
  };

  const next = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    const target = indexRef.current + 1;
    animateTo(target, () => {
      if (target === count) {
        indexRef.current = 0;
        gsap.set(trackRef.current, { x: 0 });
      } else {
        indexRef.current = target;
      }
      animatingRef.current = false;
    });
  };

  const previous = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    if (indexRef.current === 0) {
      gsap.set(trackRef.current, { x: -count * slideWidth() });
      indexRef.current = count;
    }
    const target = indexRef.current - 1;
    animateTo(target, () => {
      indexRef.current = target;
      animatingRef.current = false;
    });
  };

  const stopAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startAuto = () => {
    stopAuto();
    if (reduced()) return;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
  };

  const handlePrevious = () => {
    previous();
    startAuto();
  };

  const handleNext = () => {
    next();
    startAuto();
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.set(trackRef.current, { x: -indexRef.current * slideWidth() });

      const observer = new ResizeObserver(() => {
        gsap.set(trackRef.current, { x: -indexRef.current * slideWidth() });
      });
      if (viewportRef.current) observer.observe(viewportRef.current);

      if (!reduced()) {
        gsap.from(section.querySelectorAll("[data-testimonial-reveal]"), {
          y: "1.5em",
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        });
      }

      return () => observer.disconnect();
    },
    { scope: sectionRef },
  );

  useMountEffect(() => {
    startAuto();
    return stopAuto;
  });

  return (
    <section
      ref={sectionRef}
      id="section_testimonials"
      data-theme-section
      className="section_testimonials theme-cream"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="testimonials_inner">
            <span className="testimonials_label" data-testimonial-reveal>
              Testimonials
            </span>

            <div
              className="testimonials_viewport"
              ref={viewportRef}
              onMouseEnter={stopAuto}
              onMouseLeave={startAuto}
              data-testimonial-reveal
            >
              <div className="testimonials_track" ref={trackRef}>
                {slides.map((item, index) => (
                  <figure
                    key={index}
                    className="testimonials_slide"
                    aria-hidden={index === slides.length - 1}
                  >
                    <blockquote className="testimonials_quote heading-xs">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="testimonials_source">
                      {item.source}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="testimonials_footer" data-testimonial-reveal>
              <div className="testimonials_controls">
                <button
                  type="button"
                  className="testimonials_arrow"
                  aria-label="Previous testimonial"
                  onClick={handlePrevious}
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  className="testimonials_arrow"
                  aria-label="Next testimonial"
                  onClick={handleNext}
                >
                  <ChevronRight />
                </button>
              </div>

              <div className="testimonials_cta">
                <IconButton
                  href="/contact"
                  label="Book an intro call"
                  ariaLabel="Book an intro call"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
