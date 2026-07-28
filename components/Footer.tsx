"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scrollToTop } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

type FooterLink = { href: string; label: string; newTab?: boolean };

type FooterProps = {
  navLinks?: FooterLink[];
  social?: FooterLink[];
  email?: string;
  footerLead?: string;
  siteName?: string;
};

export function Footer({
  navLinks,
  social,
  email,
  footerLead,
  siteName,
}: FooterProps = {}) {
  const sitemap = navLinks ?? [];
  const socials = social ?? [];
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(footer.querySelectorAll("[data-footer-reveal]"), {
        y: "1.5em",
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: footer, start: "top 70%", once: true },
      });

      gsap.from(footer.querySelector(".footer_wordmark"), {
        yPercent: 18,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".footer_wordmark", start: "top 92%", once: true },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      data-theme-section
      className="footer theme-default"
    >
      <div className="padding-global">
        <div className="container-col-12">
          <div className="footer_top">
            <div className="footer_contact">
              <p className="footer_lead paragraph-s" data-footer-reveal>
                {footerLead}
              </p>
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="footer_email"
                  data-footer-reveal
                >
                  {email}
                </a>
              )}
            </div>

            <nav className="footer_nav" aria-label="Footer">
              <div className="footer_col" data-footer-reveal>
                <span className="footer_col-label">Sitemap</span>
                <ul className="footer_list">
                  {sitemap.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="footer_link">
                        <span className="footer_link-text">{item.label}</span>
                        <span className="footer_link-line" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer_col" data-footer-reveal>
                <span className="footer_col-label">Connect</span>
                <ul className="footer_list">
                  {socials.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="footer_link"
                      >
                        <span className="footer_link-text">{item.label}</span>
                        <span className="footer_link-line" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="footer_wordmark-wrap">
            <div
              className="footer_wordmark"
              role="img"
              aria-label={siteName}
            />
          </div>

          <div className="footer_base">
            <p className="footer_legal">
              &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
            </p>
            <div className="footer_base-right">
              <Link href="/privacy" className="footer_link">
                <span className="footer_link-text">Privacy</span>
                <span className="footer_link-line" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={scrollToTop}
                className="footer_top-link"
              >
                <span className="footer_link-text">Back to top</span>
                <svg
                  className="footer_top-arrow"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 14V2M3 7L8 2L13 7"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="square"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
