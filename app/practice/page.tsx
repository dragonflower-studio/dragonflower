import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { PracticeHero } from "@/components/PracticeHero";
import { PracticeDetail, type PracticeData } from "@/components/PracticeDetail";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Practice — Dragonflower Studio",
  description:
    "Our work sits at the intersection of inquiry and imagination. One studio, three practices: research, narrative, and strategy.",
};

const LOREM_APPROACH = [
  {
    title: "Lorem ipsum",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    title: "Dolor sit amet",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
  },
  {
    title: "Consectetur",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
  },
];

const LOREM_BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const PRACTICES: PracticeData[] = [
  {
    number: "01",
    title: "Research",
    theme: "theme-cream",
    promise: "We uncover the truths that move people and systems.",
    overview: [
      "Through deep qualitative work — interviews, synthesis, landscape mapping — we reveal the human tensions behind complex change.",
      LOREM_BODY,
    ],
    approach: LOREM_APPROACH,
    capabilities: [
      "Qualitative interviews",
      "Landscape mapping",
      "Synthesis",
      "Workshops",
    ],
    deliverables: [
      "Lorem ipsum dolor",
      "Sit amet consectetur",
      "Adipiscing elit",
      "Tempor incididunt",
    ],
    image: {
      src: "/practice-research-landscape.webp",
      alt: "Research in practice",
    },
  },
  {
    number: "02",
    title: "Narrative",
    theme: "theme-surface",
    promise: "We translate insight into clarity and conviction.",
    overview: [
      "We craft the story that aligns teams, inspires audiences, and makes belief possible through positioning, architecture, and brand narrative.",
      LOREM_BODY,
    ],
    approach: LOREM_APPROACH,
    capabilities: [
      "Positioning",
      "Architecture",
      "Storytelling",
      "Brand narrative",
      "Pitch decks",
    ],
    deliverables: [
      "Lorem ipsum dolor",
      "Sit amet consectetur",
      "Adipiscing elit",
      "Tempor incididunt",
    ],
    image: {
      src: "/practice-narrative-landscape.webp",
      alt: "Narrative in practice",
    },
  },
  {
    number: "03",
    title: "Strategy",
    theme: "theme-cream",
    promise: "We design how ideas move through the world.",
    overview: [
      "From frameworks to expressions, we build systems that make the story tangible — through creative strategy, narrative toolkits, playbooks, and more.",
      LOREM_BODY,
    ],
    approach: LOREM_APPROACH,
    capabilities: [
      "Narrative toolkits",
      "Playbooks",
      "Creative strategies",
      "Frameworks",
      "Campaigns",
    ],
    deliverables: [
      "Lorem ipsum dolor",
      "Sit amet consectetur",
      "Adipiscing elit",
      "Tempor incididunt",
    ],
    image: {
      src: "/practice-strategy-landscape.webp",
      alt: "Strategy in practice",
    },
  },
];

export default function PracticePage() {
  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <PracticeHero />
        {PRACTICES.map((practice) => (
          <PracticeDetail key={practice.number} data={practice} />
        ))}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
