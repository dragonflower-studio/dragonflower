import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Breather } from "@/components/Breather";
import { Practice } from "@/components/Practice";
import { Showcase } from "@/components/Showcase";
import { Testimonials } from "@/components/Testimonials";
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
        <Work />
        <Showcase />
        <Testimonials />
        <Practice />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
