import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Breather } from "@/components/Breather";
import { Practice } from "@/components/Practice";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <Hero />
        <Breather />
        <Practice />
      </main>
    </>
  );
}
