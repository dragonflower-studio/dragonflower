import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { AboutHero } from "@/components/AboutHero";
import { AboutStatement } from "@/components/AboutStatement";
import { Transformation } from "@/components/Transformation";
import { Method } from "@/components/Method";
import { Studio } from "@/components/Studio";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Dragonflower Studio",
  description:
    "Dragonflower was born to humanize complexity that has the power to change the world. We study how people make sense of the world, then design the stories that help them see it differently.",
};

export default function About() {
  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <AboutHero />
        <AboutStatement />
        <Studio />
        <Transformation />
        <Method />
        <CTA heading="We turn complexity into clarity — without losing the magic." />
      </main>
      <Footer />
    </>
  );
}
