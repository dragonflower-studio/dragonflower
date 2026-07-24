"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";
import { Marquee } from "@/components/Marquee";
import { WaterTexture } from "@/components/WaterTexture";

gsap.registerPlugin(SplitText);

const CLIENTS = [
  { name: "IDEO", logo: "/logos/ideo.svg", width: 287, height: 69 },
  { name: "Harvard Chan Center", logo: "/logos/harvard.webp", width: 931, height: 702, scale: 1.7 },
  { name: "Good Energy", logo: "/logos/good-energy.png", width: 288, height: 40 },
  { name: "Netflix", logo: "/logos/netflix.webp", width: 284, height: 512 },
  { name: "Disney", logo: "/logos/disney.svg", width: 1041, height: 565 },
  { name: "Ethereum Foundation", logo: "/logos/ethereum.png", width: 5000, height: 1536 },
  { name: "WE3", logo: "/logos/we3.png", width: 1030, height: 1030, scale: 1.55 },
  { name: "Plaid", logo: "/logos/plaid.png", width: 1280, height: 483 },
  { name: "Espresso", logo: "/logos/espresso.webp", width: 780, height: 227 },
  { name: "Shift Naturals", logo: "/logos/shift.webp", width: 488, height: 115 },
];


export function Hero() {
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
                  Dragonflower is a strategic research and narrative design
                  studio.
                </h1>

                <div className="hero-home_text-wrap">
                  <p data-hero-copy className="paragraph-m split-pending">
                    We uncover the human truths within complex systems and turn
                    them into stories, strategies, and movements people can
                    believe in.
                  </p>
                </div>

                <div className="btn-group">
                  <IconButton
                    href="/practice"
                    label="Practice"
                    variant="secondary"
                    withArrow={false}
                  />
                  <IconButton
                    href="/contact"
                    label="Book a call"
                    ariaLabel="Book a call"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-home_marquee is-intro-pending">
          <Marquee items={CLIENTS} label="Clients & collaborators" />
        </div>
      </div>
    </header>
  );
}
