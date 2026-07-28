import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectBody } from "@/components/ProjectBody";
import { ProjectSnapshots } from "@/components/ProjectSnapshots";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { safeFetch } from "@/sanity/lib/fetch";
import { projectQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import type { ProjectData } from "@/sanity/lib/types";
import * as map from "@/sanity/lib/map";

const EMPTY: ProjectData = { settings: null, workCta: null, project: null };

export async function generateStaticParams() {
  const slugs = await safeFetch<string[]>(projectSlugsQuery, {}, []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await safeFetch<ProjectData>(projectQuery, { slug }, EMPTY);
  if (!project) return { title: "Work — Dragonflower Studio" };
  return {
    title: `${project.title} | Dragonflower Studio`,
    description: project.detailTagline ?? project.indexTagline ?? undefined,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { settings, workCta, project } = await safeFetch<ProjectData>(
    projectQuery,
    { slug },
    EMPTY,
  );

  if (!project || !project.hasDetailPage) {
    notFound();
  }

  const snapshots = (project.snapshotsImages ?? []).map(map.sizedImage);

  return (
    <>
      <Nav navLinks={map.navLinks(settings)} bookCall={map.link(settings?.bookCall)} />
      <main className="main-wrapper">
        <ProjectHero
          title={project.title}
          tagline={project.detailTagline ?? ""}
          collaborators={project.detailCollaborators ?? ""}
          image={map.sizedImage(project.detailImage)}
        />
        <ProjectBody
          chapters={(project.chapters ?? []).map((c) => ({
            label: c.label,
            lead: c.lead,
            emphasis: c.emphasis,
            paragraphs: c.paragraphs ?? [],
            quotes: c.quotes,
          }))}
        />
        {snapshots.length > 0 && (
          <ProjectSnapshots
            heading={project.snapshotsHeading ?? "Work Snapshots"}
            caption={project.snapshotsCaption ?? ""}
            images={snapshots}
          />
        )}
        <CTA
          heading={workCta?.heading}
          image={map.image(workCta?.image)}
          button={map.link(workCta?.button)}
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
