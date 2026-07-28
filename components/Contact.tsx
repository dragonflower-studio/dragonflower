"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";

gsap.registerPlugin(SplitText);

type SocialLink = { href: string; label: string };

type ContactProps = {
  heading?: string;
  copy?: string;
  calendlyUrl?: string;
  calendlyLabel?: string;
  writeLabel?: string;
  email?: string;
  social?: SocialLink[];
};

export function Contact({
  heading,
  copy,
  calendlyUrl,
  calendlyLabel,
  writeLabel,
  email,
  social,
}: ContactProps = {}) {
  const socials = social ?? [];
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
              {heading}
            </h1>

            <p className="contact_copy paragraph-m" data-contact-reveal>
              {copy}
            </p>

            {calendlyUrl && (
              <div className="contact_cta" data-contact-reveal>
                <IconButton
                  href={calendlyUrl}
                  label={calendlyLabel ?? ""}
                  ariaLabel={calendlyLabel ?? ""}
                  newTab
                />
              </div>
            )}

            {email && (
              <div className="contact_actions" data-contact-reveal>
                <span className="contact_label">{writeLabel}</span>
                <a href={`mailto:${email}`} className="contact_email">
                  {email}
                </a>
              </div>
            )}

            <ul className="contact_social" data-contact-reveal>
              {socials.map((item) => (
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
