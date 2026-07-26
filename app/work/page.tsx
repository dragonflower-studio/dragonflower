import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { WorkHero } from "@/components/WorkHero";
import { CaseStudy, type CaseStudyData } from "@/components/CaseStudy";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Work — Dragonflower Studio",
  description:
    "Clarity in practice. Research, narrative, and strategy across Ethereum, Good Energy, and Plaid.",
};

const CASES: CaseStudyData[] = [
  {
    id: "ethereum",
    theme: "theme-cream",
    title: "Ethereum — Project Mirror",
    tagline:
      "A research-driven reflection on how Ethereum sees itself, how others see it, and how that story shapes the ecosystem's future.",
    body: [
      "Commissioned by Optimism and Espresso, and supported by the Ethereum Foundation, Project Mirror captured 60+ voices across the ecosystem — from builders to policymakers — to understand how Ethereum's identity, momentum, and myth were evolving.",
      "The work revealed five defining shifts and surfaced core tensions like The Loss in Translation and The Neutrality Dilemma, reframing the network's “crisis” as an inflection point for renewed belief.",
    ],
    image: {
      src: "/work-ethereum.webp",
      width: 1400,
      height: 1050,
      alt: "Ethereum, Project Mirror",
    },
    href: "/work/ethereum",
  },
  {
    id: "good-energy",
    theme: "theme-surface",
    title: "Good Energy — Climate Reality Check",
    tagline:
      "A diagnostic tool revealing how climate shows up across film and television — and how it can do better.",
    body: [
      "Partnering with Good Energy, Dragonflower led research design and narrative strategy for The Climate Reality Check, a first-of-its-kind framework assessing climate presence in popular culture.",
      "We mapped hundreds of scripts, storylines, and character arcs to identify narrative blind spots and emotional levers that shape public perception. The work turned abstract “representation gaps” into a living system of questions — now used by studios and writers to tell stories that make climate reality visible.",
    ],
    image: {
      src: "/good-energy.webp",
      width: 1200,
      height: 800,
      alt: "Good Energy, Climate Reality Check",
    },
  },
  {
    id: "plaid",
    theme: "theme-cream",
    title: "Plaid — Linkless Initiative",
    tagline: "A new language of trust for the future of credit.",
    body: [
      "As lead researcher and designer, Dragonflower helped Plaid reimagine how people share their financial lives. The Linkless Initiative enables consumers to share verified cash-flow data as easily as they share credit reports — no bank logins, no friction.",
      "Through qualitative research, prototyping, and systems design, we shaped the user experience and narrative around Linkless, defining what transparent, user-controlled credit could look like.",
      "The result reframes Plaid's central question from Can we connect? to Can we be trusted?",
    ],
    image: {
      src: "/work-plaid.webp",
      width: 1400,
      height: 933,
      alt: "Plaid, Linkless Initiative",
    },
  },
];

export default function Work() {
  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <WorkHero />
        {CASES.map((data) => (
          <CaseStudy key={data.id} data={data} />
        ))}
        <CTA heading="Change requires belief. Belief requires clarity." />
      </main>
      <Footer />
    </>
  );
}
