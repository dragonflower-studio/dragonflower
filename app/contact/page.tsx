import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { safeFetch } from "@/sanity/lib/fetch";
import { contactQuery } from "@/sanity/lib/queries";
import type { ContactData } from "@/sanity/lib/types";
import * as map from "@/sanity/lib/map";

export const metadata: Metadata = {
  title: "Contact — Dragonflower Studio",
  description:
    "Tell us what you're trying to make clear. Write to us at hello@dragonflower.studio.",
};

export default async function ContactPage() {
  const data = await safeFetch<ContactData>(contactQuery, {}, { settings: null, page: null });
  const { settings, page } = data;
  const social = map.navLinks(settings, "socialLinks");

  return (
    <>
      <Nav navLinks={map.navLinks(settings)} bookCall={map.link(settings?.bookCall)} />
      <main className="main-wrapper">
        <Contact
          heading={page?.heading}
          copy={page?.copy}
          calendlyUrl={page?.calendlyUrl}
          calendlyLabel={page?.calendlyLabel}
          writeLabel={page?.writeLabel}
          email={settings?.email}
          social={social}
        />
      </main>
      <Footer
        navLinks={map.navLinks(settings)}
        social={social}
        email={settings?.email}
        footerLead={settings?.footerLead}
        siteName={settings?.siteName}
      />
    </>
  );
}
