import { Nav } from "@/components/Nav";
import { NotFound } from "@/components/NotFound";
import { Footer } from "@/components/Footer";

export default function NotFoundPage() {
  return (
    <>
      <Nav />
      <main className="main-wrapper">
        <NotFound />
      </main>
      <Footer />
    </>
  );
}
