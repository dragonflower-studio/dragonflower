import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { PracticeHero } from "@/components/PracticeHero";
import { PracticeDetail } from "@/components/PracticeDetail";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { safeFetch } from "@/sanity/lib/fetch";
import { practiceQuery } from "@/sanity/lib/queries";
import type { PracticeData as PracticePageData } from "@/sanity/lib/types";
import * as map from "@/sanity/lib/map";

export const metadata: Metadata = {
  title: "Practice — Dragonflower Studio",
  description:
    "Our work sits at the intersection of inquiry and imagination. One studio, three practices: research, narrative, and strategy.",
};

export default async function PracticePage() {
  const data = await safeFetch<PracticePageData>(practiceQuery, {}, {
    settings: null,
    page: null,
    practices: [],
  });
  const { settings, page, practices } = data;
  const items = practices.map(map.practiceDetail);

  return (
    <>
      <Nav navLinks={map.navLinks(settings)} bookCall={map.link(settings?.bookCall)} />
      <main className="main-wrapper">
        <PracticeHero
          meta={page?.heroMeta}
          title={page?.heroTitle}
          sub={page?.heroSub}
        />
        {items.map((practice) => (
          <PracticeDetail key={practice.number} data={practice} />
        ))}
        <CTA
          heading={page?.cta?.heading}
          image={map.image(page?.cta?.image)}
          button={map.link(page?.cta?.button)}
        />
      </main>
      <Footer
        navLinks={map.navLinks(settings)}
        social={map.navLinks(settings, "socialLinks")}
        email={settings?.email}
        footerLead={settings?.footerLead}
        siteName={settings?.siteName}
      />
    </>
  );
}
