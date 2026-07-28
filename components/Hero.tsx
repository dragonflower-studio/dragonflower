"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";
import { Marquee, type MarqueeItem } from "@/components/Marquee";
import { WaterTexture } from "@/components/WaterTexture";

gsap.registerPlugin(SplitText);

type CtaLink = { label: string; href: string; newTab?: boolean } | null | undefined;

type HeroProps = {
  heading?: string;
  body?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  clients?: MarqueeItem[];
  clientsLabel?: string;
};

export function Hero({
  heading,
  body,
  primaryCta,
  secondaryCta,
  clients = [],
  clientsLabel,
}: HeroProps = {}) {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const heading = hero.querySelector<HTMLElement>("[data-hero-heading]");
      const paragraph = hero.querySelector<HTMLElement>("[data-hero-copy]");

      const headingSplit =
        heading &&
        new SplitText(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });
      const paragraphSplit =
        paragraph &&
        new SplitText(paragraph, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      heading?.classList.remove("split-pending");
      paragraph?.classList.remove("split-pending");
      hero
        .querySelector(".hero-home_marquee")
        ?.classList.remove("is-intro-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (headingSplit) {
        intro.fromTo(
          headingSplit.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, stagger: 0.15 },
          0.2,
        );
      }

      if (paragraphSplit) {
        intro.fromTo(
          paragraphSplit.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, stagger: 0.15 },
          0.35,
        );
      }

      intro.fromTo(
        ".btn-group .btn-icon-link",
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: "back.out(1.7)", stagger: 0.05 },
        0.45,
      );

      intro.fromTo(
        ".marquee_label",
        { yPercent: 100 },
        { yPercent: 0, duration: 0.6 },
        0.55,
      );

      intro.fromTo(
        ".marquee_viewport",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1 },
        0.62,
      );
    },
    { scope: heroRef },
  );

  return (
    <header
      ref={heroRef}
      id="section_hero"
      data-theme-section
      className="section_hero theme-default"
    >
      <div className="hero-home_texture" aria-hidden="true">
        <div className="hero-home_texture-veins" />
        <WaterTexture src="/wing-texture.webp" opacity={0.06} />
      </div>

      <div className="hero-home_wrapper">
        <div className="hero-home_body">
          <div className="padding-global">
            <div className="container-col-12">
              <div className="hero-home_content">
                <h1 data-hero-heading className="heading-xl split-pending">
                  {heading}
                </h1>

                <div className="hero-home_text-wrap">
                  <p data-hero-copy className="paragraph-m split-pending">
                    {body}
                  </p>
                </div>

                <div className="btn-group">
                  {secondaryCta && (
                    <IconButton
                      href={secondaryCta.href}
                      label={secondaryCta.label}
                      variant="secondary"
                      withArrow={false}
                      newTab={secondaryCta.newTab}
                    />
                  )}
                  {primaryCta && (
                    <IconButton
                      href={primaryCta.href}
                      label={primaryCta.label}
                      ariaLabel={primaryCta.label}
                      newTab={primaryCta.newTab}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-home_marquee is-intro-pending">
          <Marquee items={clients} label={clientsLabel} />
        </div>
      </div>
    </header>
  );
}
