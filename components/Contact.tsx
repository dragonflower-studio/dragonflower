"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(SplitText);

const EMAIL = "hello@dragonflower.studio";
const CALENDLY = "https://calendly.com/dragonflower";

const SOCIAL = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://www.x.com", label: "X" },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector<HTMLElement>("[data-contact-heading]");
      const split =
        heading &&
        new SplitText(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

      heading?.classList.remove("split-pending");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (split) {
        intro.fromTo(
          split.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.14 },
          0.1,
        );
      }

      intro.from(
        section.querySelectorAll("[data-contact-reveal]"),
        { y: "1.4em", opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.4,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="section_contact"
      data-theme-section
      className="section_contact theme-cream"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="contact_inner">
            <h1
              data-contact-heading
              className="contact_heading heading-l split-pending"
            >
              Lorem ipsum dolor sit amet consectetur.
            </h1>

            <p className="contact_copy paragraph-m" data-contact-reveal>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua, quis
              nostrud exercitation ullamco laboris.
            </p>

            <div className="contact_cta" data-contact-reveal>
              <IconButton
                href={CALENDLY}
                label="Book a call"
                ariaLabel="Book a call"
                newTab
              />
            </div>

            <div className="contact_actions" data-contact-reveal>
              <span className="contact_label">Write to us</span>
              <a href={`mailto:${EMAIL}`} className="contact_email">
                {EMAIL}
              </a>
            </div>

            <ul className="contact_social" data-contact-reveal>
              {SOCIAL.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact_social-link"
                  >
                    <span className="contact_social-text">{item.label}</span>
                    <span className="contact_social-line" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
