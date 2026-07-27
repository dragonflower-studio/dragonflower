import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Dragonflower Studio",
  description:
    "Tell us what you're trying to make clear. Write to us at hello@dragonflower.studio.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
