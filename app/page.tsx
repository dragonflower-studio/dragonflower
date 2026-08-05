import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Breather } from "@/components/Breather";
import { Practice } from "@/components/Practice";
import { Showcase } from "@/components/Showcase";
import { Testimonials } from "@/components/Testimonials";
import { Work } from "@/components/Work";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { safeFetch } from "@/sanity/lib/fetch";
import { homeQuery } from "@/sanity/lib/queries";
import type { HomeData } from "@/sanity/lib/types";
import * as map from "@/sanity/lib/map";

const FALLBACK: HomeData = {
  settings: null,
  page: null,
  clients: [],
  testimonials: [],
  projects: [],
  practices: [],
};

export default async function Home() {
  const data = await safeFetch<HomeData>(homeQuery, {}, FALLBACK);
  const { settings, page, clients, testimonials, projects, practices } = data;

  return (
    <>
      <Nav navLinks={map.navLinks(settings)} bookCall={map.link(settings?.bookCall ?? undefined)} />
      <main className="main-wrapper">
        <Hero
          heading={page?.heroHeading}
          body={page?.heroBody}
          primaryCta={map.link(page?.heroPrimary ?? undefined)}
          clients={clients.length ? map.marqueeItems(clients) : undefined}
          clientsLabel={page?.clientsLabel}
        />
        <Breather
          statement={page?.breatherStatement}
          lead={page?.breatherLead}
          cta={map.link(page?.breatherCta ?? undefined)}
          founderName={page?.founderName}
          founderRole={page?.founderRole}
          portrait={map.image(page?.founderPortrait)}
        />
        <Work
          heading={page?.workHeading}
          projects={projects.length ? projects.map(map.workCard) : undefined}
        />
        <Showcase
          desktop={map.image(page?.showcaseDesktop)}
          mobile={map.image(page?.showcaseMobile)}
        />
        <Testimonials
          quotes={testimonials.length ? testimonials : undefined}
          label={page?.testimonialsLabel}
          cta={map.link(page?.testimonialsCta ?? undefined)}
        />
        <Practice
          practices={practices.length ? practices.map(map.practiceCard) : undefined}
          introHeading={page?.practiceIntroHeading}
          overviewStatement={page?.practiceOverviewStatement}
          overviewBody={page?.practiceOverviewBody}
        />
        <CTA
          heading={page?.cta?.heading}
          image={map.image(page?.cta?.image)}
          button={map.link(page?.cta?.button ?? undefined)}
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
