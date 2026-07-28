import { Nav } from "@/components/Nav";
import { NotFound } from "@/components/NotFound";
import { Footer } from "@/components/Footer";
import { safeFetch } from "@/sanity/lib/fetch";
import { notFoundQuery } from "@/sanity/lib/queries";
import type { NotFoundData } from "@/sanity/lib/types";
import * as map from "@/sanity/lib/map";

export default async function NotFoundPage() {
  const data = await safeFetch<NotFoundData>(notFoundQuery, {}, { settings: null, page: null });
  const { settings, page } = data;

  return (
    <>
      <Nav navLinks={map.navLinks(settings)} bookCall={map.link(settings?.bookCall)} />
      <main className="main-wrapper">
        <NotFound
          code={page?.code}
          heading={page?.heading}
          copy={page?.copy}
          buttonLabel={page?.buttonLabel}
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
