import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { AboutHero } from "@/components/AboutHero";
import { Transformation } from "@/components/Transformation";
import { Method } from "@/components/Method";
import { Studio } from "@/components/Studio";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { safeFetch } from "@/sanity/lib/fetch";
import { aboutQuery } from "@/sanity/lib/queries";
import type { AboutData } from "@/sanity/lib/types";
import * as map from "@/sanity/lib/map";

export const metadata: Metadata = {
  title: "About Dragonflower Studio",
  description:
    "Dragonflower was born to humanize complexity that has the power to change the world. We study how people make sense of the world, then design the stories that help them see it differently.",
};

export default async function About() {
  const data = await safeFetch<AboutData>(aboutQuery, {}, { settings: null, page: null });
  const { settings, page } = data;

  return (
    <>
      <Nav navLinks={map.navLinks(settings)} bookCall={map.link(settings?.bookCall)} />
      <main className="main-wrapper">
        <AboutHero
          heading={page?.heroHeading}
          copy={page?.heroCopy}
          cta={map.link(page?.heroCta)}
        />
        <Studio
          title={page?.studioTitle}
          lead={page?.studioLead}
          body={page?.studioBody}
          founderBio={page?.founderBio}
          founderName={page?.founderName}
          founderRole={page?.founderRole}
          portrait={map.image(page?.studioPortrait)}
        />
        <Transformation
          heading={page?.transformHeading}
          pairs={page?.transformPairs?.length ? page.transformPairs : undefined}
        />
        <Method
          title={page?.methodTitle}
          steps={page?.methodSteps?.length ? page.methodSteps : undefined}
          cta={map.link(page?.methodCta)}
        />
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
