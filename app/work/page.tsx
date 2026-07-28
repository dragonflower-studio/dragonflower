import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { WorkHero } from "@/components/WorkHero";
import { CaseStudy } from "@/components/CaseStudy";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { safeFetch } from "@/sanity/lib/fetch";
import { workQuery } from "@/sanity/lib/queries";
import type { WorkData } from "@/sanity/lib/types";
import * as map from "@/sanity/lib/map";

export const metadata: Metadata = {
  title: "Work — Dragonflower Studio",
  description:
    "Clarity in practice. Research, narrative, and strategy across Ethereum, Good Energy, and Plaid.",
};

export default async function Work() {
  const data = await safeFetch<WorkData>(workQuery, {}, {
    settings: null,
    page: null,
    projects: [],
  });
  const { settings, page, projects } = data;
  const cases = projects.map(map.caseStudy);

  return (
    <>
      <Nav navLinks={map.navLinks(settings)} bookCall={map.link(settings?.bookCall)} />
      <main className="main-wrapper">
        <WorkHero title={page?.heroTitle} sub={page?.heroSub} />
        {cases.map((item) => (
          <CaseStudy key={item.id} data={item} />
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
