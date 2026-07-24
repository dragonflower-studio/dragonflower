import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Breather } from "@/components/Breather";
import { Practice } from "@/components/Practice";
import { Work } from "@/components/Work";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <Hero />
        <Breather />
        <Practice />
        <Work />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
