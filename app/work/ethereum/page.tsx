import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectBody, type Chapter } from "@/components/ProjectBody";
import { ProjectSnapshots } from "@/components/ProjectSnapshots";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ethereum — Project Mirror | Dragonflower Studio",
  description:
    "A reflection on how Ethereum sees itself, how others see it, and how that gap shapes its future. A collaboration with the Ethereum Foundation, Optimism, and Espresso Systems.",
};

const CHAPTERS: Chapter[] = [
  {
    label: "The Challenge",
    lead: "Ethereum has become the most powerful yet least understood ecosystem in web3.",
    emphasis: "Technically unmatched. Narratively undefined.",
    paragraphs: [
      "Ethereum's code scaled faster than its story, and the gap between the two became emotional — especially as credible competitors with sharp messaging emerged in the category Ethereum created.",
      "The Foundation needed to understand how Ethereum's identity was evolving, and how its core belief in neutrality may continue to inspire conviction instead of creating distance.",
    ],
  },
  {
    label: "The Process",
    paragraphs: [
      "Through more than sixty interviews — from protocol engineers to investors to policymakers — we followed the invisible questions under every answer: What is the narrative around Ethereum today?",
      "Patterns emerged: neutrality versus leadership, adaptability versus clarity, silence versus influence.",
      "Rather than resolve the contradictions, we gave them names. The Lost in Translation. The Neutrality Dilemma. The Culture Moat.",
    ],
  },
  {
    label: "The Outcome",
    paragraphs: [
      "The work clarified Ethereum's narrative fractures and helped leadership bridge them with strategic precision. It provided a shared vocabulary for how neutrality, leadership, and belief should coexist. Project Mirror also became the first qualitative research report ever published by the Ethereum Foundation.",
    ],
  },
  {
    label: "The Impact",
    paragraphs: [
      "The process became as meaningful as the findings. It was the first time the ecosystem had stopped to listen to itself. And what was initially scoped as a confidential report was made public by leadership.",
    ],
    quotes: [
      "Thank you for listening to me. This felt like therapy.",
      "I wouldn't say I learned something new, but I don't think our challenges have ever been so clearly articulated in one place.",
      "Let's open source it. This has massive potential to teach our team leads and ecosystem teams on how to think about branding and users.",
    ],
  },
];

export default function EthereumProject() {
  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <ProjectHero
          title="Ethereum — Project Mirror"
          tagline="A reflection on how Ethereum sees itself, how others see it — and how that gap shapes its future."
          collaborators="A collaboration with the Ethereum Foundation, Optimism, and Espresso Systems."
          image={{
            src: "/work-ethereum.webp",
            width: 1400,
            height: 1050,
            alt: "Ethereum, Project Mirror",
          }}
        />
        <ProjectBody chapters={CHAPTERS} />
        <ProjectSnapshots
          heading="Work Snapshots"
          caption="Frameworks and insights that made Ethereum's invisible dynamics visible."
          images={[
            {
              src: "/work-ethereum-map.webp",
              width: 2290,
              height: 1576,
              alt: "Project Mirror framework mapping Ethereum's ecosystem archetypes",
            },
            {
              src: "/work-ethereum-tension.webp",
              width: 1852,
              height: 1530,
              alt: "Project Mirror framework on the Neutrality Dilemma tension",
            },
          ]}
        />
        <CTA heading="Change requires belief. Belief requires clarity." />
      </main>
      <Footer />
    </>
  );
}
