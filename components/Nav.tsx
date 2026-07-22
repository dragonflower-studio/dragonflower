"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IconButton } from "@/components/IconButton";
import { useMountEffect } from "@/hooks/useMountEffect";

const NAV_LINKS = [
  { href: "/practice", label: "Practice", aria: "Practice link" },
  { href: "/work", label: "Work", aria: "Work link" },
  { href: "/about", label: "About", aria: "About link" },
  { href: "/contact", label: "Contact", aria: "Contact link" },
];

const THEME_PREFIX = "theme-";
const DEFAULT_THEME = "theme-default";
const PROBE_OFFSET_EM = 3;
const MOBILE_BREAKPOINT = 767;

function themeClassOf(element: Element) {
  return (
    [...element.classList].find((name) => name.startsWith(THEME_PREFIX)) ?? null
  );
}

function buildMenuTimeline(root: HTMLElement) {
  const find = (selector: string) => [...root.querySelectorAll(selector)];

  return gsap
    .timeline({ paused: true, defaults: { ease: "expo.out" } })
    .fromTo(
      find(".nav-links, .nav-menu-bg"),
      { y: 0, yPercent: -100 },
      { y: 0, yPercent: 0, duration: 0.8 },
      0,
    )
    .fromTo(
      find(".nav-link-text"),
      { y: 0, yPercent: 100 },
      { y: 0, yPercent: 0, duration: 0.53, stagger: 0.03 },
      0.36,
    )
    .fromTo(
      find(".btn-icon_menu-div.is-top"),
      { y: 0, rotate: 0 },
      { y: 4, rotate: 45, duration: 0.53 },
      0,
    )
    .fromTo(
      find(".btn-icon_menu-div.is-bottom"),
      { y: 0, rotate: 0 },
      { y: -4, rotate: -45, duration: 0.53 },
      0,
    )
    .fromTo(
      find(".nav-menu-button"),
      { y: 0, yPercent: 200 },
      { y: 0, yPercent: 0, duration: 0.53 },
      0.44,
    );
}

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useMountEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const applyTheme = (theme: string) => {
      [...nav.classList]
        .filter((name) => name.startsWith(THEME_PREFIX))
        .forEach((name) => nav.classList.remove(name));
      nav.classList.add(theme);
    };

    const syncTheme = () => {
      const probe =
        PROBE_OFFSET_EM * parseFloat(getComputedStyle(document.body).fontSize);
      const sections = [
        ...document.querySelectorAll("[data-theme-section]"),
      ].filter(themeClassOf);

      const active = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probe && rect.bottom > probe;
      });

      applyTheme(
        (active && themeClassOf(active)) ??
          themeClassOf(document.body) ??
          DEFAULT_THEME,
      );
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        syncTheme();
        queued = false;
      });
    };

    syncTheme();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const media = gsap.matchMedia();

      media.add(`(max-width: ${MOBILE_BREAKPOINT}px)`, () => {
        menuTimeline.current = buildMenuTimeline(nav);
        return () => {
          menuTimeline.current = null;
          setMenuOpen(false);
          document.body.style.overflow = "";
        };
      });

      media.add(`(min-width: ${MOBILE_BREAKPOINT + 1}px)`, () => {
        gsap.from(
          [
            nav.querySelector(".nav-logo"),
            nav.querySelector(".nav-links_wrapper"),
            nav.querySelector(".nav-button"),
          ],
          {
            yPercent: -160,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 0.1,
          },
        );
      });
    },
    { scope: navRef },
  );

  const toggleMenu = () => {
    const timeline = menuTimeline.current;
    if (!timeline) return;

    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
    if (next) timeline.play();
    else timeline.reverse();
  };

  return (
    <header
      ref={navRef}
      role="banner"
      className={`nav ${DEFAULT_THEME}`}
      data-menu-open={menuOpen}
    >
      <div className="nav-menu-bg" />

      <nav className="nav-links" aria-label="Primary">
        <div className="nav-links_wrapper">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.aria}
              className="nav-link"
            >
              <span className="nav-link-text">{link.label}</span>
              <span className="nav-link-underline" />
            </Link>
          ))}
        </div>

        <div className="nav-menu-button">
          <IconButton
            href="/contact"
            label="Book a call"
            ariaLabel="Book a call"
          />
        </div>
      </nav>

      <div className="padding-global">
        <div className="container-col-12">
          <div className="nav-container">
            <div className="nav-inner">
              <Link
                href="/"
                aria-label="Dragonflower Studio, home"
                aria-current="page"
                className="nav-logo"
              />

              <div className="nav-button">
                <div className="nav-button_wrap">
                  <IconButton
                    href="/contact"
                    label="Book a call"
                    ariaLabel="Book a call"
                  />
                </div>
                <div className="menu-button">
                  <button
                    className="menu-button_inner"
                    onClick={toggleMenu}
                    aria-expanded={menuOpen}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                  >
                    <span className="btn-icon_menu-div is-top" />
                    <span className="btn-icon_menu-div is-bottom" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
