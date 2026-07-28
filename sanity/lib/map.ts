import type { MarqueeItem } from "@/components/Marquee";
import type { CaseStudyData } from "@/components/CaseStudy";
import type { PracticeData } from "@/components/PracticeDetail";
import type {
  SanityImage,
  SanityLink,
  ClientLogo,
  Project,
  PracticeItem,
  Settings,
} from "./types";

type SimpleImage = { src: string; alt?: string };
type SizedImage = { src: string; width: number; height: number; alt: string };
type CtaLink = { label: string; href: string; newTab?: boolean };
type NavLinkOut = { href: string; label: string; newTab?: boolean };

export function link(value: SanityLink | undefined): CtaLink | undefined {
  if (!value || !value.href || !value.label) return undefined;
  return { label: value.label, href: value.href, newTab: value.newTab };
}

export function navLinks(
  settings: Settings | undefined,
  key: "navLinks" | "socialLinks" = "navLinks",
): NavLinkOut[] | undefined {
  const list = settings?.[key];
  if (!list) return undefined;
  const mapped = list
    .filter((l): l is NonNullable<typeof l> => !!l && !!l.href && !!l.label)
    .map((l) => ({ href: l.href, label: l.label, newTab: l.newTab }));
  return mapped.length ? mapped : undefined;
}

export function image(value: SanityImage | undefined): SimpleImage | undefined {
  if (!value || !value.src) return undefined;
  return { src: value.src, alt: value.alt };
}

export function sizedImage(value: SanityImage | undefined): SizedImage {
  return {
    src: value?.src ?? "",
    width: value?.width ?? 1600,
    height: value?.height ?? 1000,
    alt: value?.alt ?? "",
  };
}

export function marqueeItems(clients: ClientLogo[]): MarqueeItem[] {
  return (clients ?? [])
    .filter((c) => c && c.logo?.src)
    .map((c) => ({
      name: c.name,
      logo: c.logo?.src,
      width: c.logo?.width,
      height: c.logo?.height,
      scale: c.scale ?? 1,
    }));
}

export function projectHref(project: Project): string {
  return project.hasDetailPage && project.slug
    ? `/work/${project.slug}`
    : "/work";
}

export function workCard(project: Project) {
  return {
    header: project.cardHeader ?? project.title,
    subheader: project.cardSubheader ?? "",
    logos: (project.cardLogos ?? [])
      .filter((l) => l && l.image?.src)
      .map((l) => ({
        src: l.image!.src,
        alt: l.image!.alt,
        width: l.image!.width,
        height: l.image!.height,
        scale: l.scale ?? 1,
      })),
    href: projectHref(project),
    image: project.cardImage?.src ?? "",
  };
}

export function caseStudy(project: Project): CaseStudyData {
  return {
    id: project.slug ?? project.title,
    theme: project.theme ?? "theme-cream",
    title: project.title,
    tagline: project.indexTagline ?? "",
    body: project.indexBody ?? [],
    image: sizedImage(project.indexImage),
    href: project.hasDetailPage && project.slug ? `/work/${project.slug}` : undefined,
  };
}

export function practiceCard(item: PracticeItem) {
  return {
    number: item.number,
    title: item.title,
    promise: item.promise ?? "",
    body: item.homeBody ?? "",
    theme: item.homeTheme ?? "theme-violet",
    landscape: {
      src: item.landscape?.src ?? "",
      alt: item.landscape?.alt ?? "",
    },
  };
}

export function practiceDetail(item: PracticeItem): PracticeData {
  return {
    number: item.number,
    title: item.title,
    theme: item.detailTheme ?? "theme-cream",
    promise: item.promise ?? "",
    overview: item.overview ?? [],
    approach: item.approach ?? [],
    capabilities: item.capabilities ?? [],
    deliverables: item.deliverables ?? [],
    image: {
      src: item.detailImage?.src ?? "",
      alt: item.detailImage?.alt ?? "",
    },
  };
}
