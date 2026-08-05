export type SanityImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
} | null;

export type SanityLink = {
  label: string;
  href: string;
  newTab?: boolean;
} | null;

export type SanityCta = {
  heading: string;
  image: SanityImage;
  button: SanityLink;
} | null;

export type Settings = {
  siteName?: string;
  navLinks?: SanityLink[];
  bookCall?: SanityLink;
  footerLead?: string;
  email?: string;
  socialLinks?: SanityLink[];
} | null;

export type ClientLogo = {
  name: string;
  logo: SanityImage;
  scale: number;
};

export type Testimonial = {
  quote: string;
  source: string;
};

export type ProjectLogo = {
  image: SanityImage;
  scale: number;
};

export type ProjectChapter = {
  label: string;
  lead?: string;
  emphasis?: string;
  paragraphs?: string[];
  quotes?: string[];
};

export type Project = {
  title: string;
  slug?: string;
  cardHeader?: string;
  cardSubheader?: string;
  cardLogos?: ProjectLogo[];
  cardImage: SanityImage;
  theme?: string;
  indexTagline?: string;
  indexBody?: string[];
  indexImage: SanityImage;
  hasDetailPage?: boolean;
  detailTagline?: string;
  detailCollaborators?: string;
  detailImage: SanityImage;
  chapters?: ProjectChapter[];
  snapshotsHeading?: string;
  snapshotsCaption?: string;
  snapshotsImages?: SanityImage[];
};

export type PracticeItem = {
  number: string;
  title: string;
  promise?: string;
  homeBody?: string;
  homeTheme?: string;
  landscape: SanityImage;
  detailTheme?: string;
  overview?: string[];
  approach?: { title: string; body: string }[];
  capabilities?: string[];
  deliverables?: string[];
  detailImage: SanityImage;
};

export type HomePageDoc = {
  heroHeading?: string;
  heroBody?: string;
  heroPrimary?: SanityLink;
  clientsLabel?: string;
  breatherStatement?: string;
  breatherLead?: string;
  breatherCta?: SanityLink;
  founderName?: string;
  founderRole?: string;
  founderPortrait: SanityImage;
  showcaseDesktop: SanityImage;
  showcaseMobile: SanityImage;
  testimonialsLabel?: string;
  testimonialsCta?: SanityLink;
  workHeading?: string;
  practiceIntroHeading?: string;
  practiceOverviewStatement?: string;
  practiceOverviewBody?: string;
  cta: SanityCta;
} | null;

export type HomeData = {
  settings: Settings;
  page: HomePageDoc;
  clients: ClientLogo[];
  testimonials: Testimonial[];
  projects: Project[];
  practices: PracticeItem[];
};

export type AboutData = {
  settings: Settings;
  page: {
    heroHeading?: string;
    heroCopy?: string;
    heroCta?: SanityLink;
    studioTitle?: string;
    studioLead?: string;
    studioBody?: string;
    founderBio?: string;
    founderName?: string;
    founderRole?: string;
    studioPortrait: SanityImage;
    transformHeading?: string;
    transformPairs?: { from: string; to: string; description?: string }[];
    methodTitle?: string;
    methodSteps?: { name: string; promise?: string; capabilities?: string }[];
    methodCta?: SanityLink;
    cta: SanityCta;
  } | null;
};

export type WorkData = {
  settings: Settings;
  page: { heroTitle?: string; heroSub?: string; cta: SanityCta } | null;
  projects: Project[];
};

export type ProjectData = {
  settings: Settings;
  workCta: SanityCta;
  project: Project | null;
};

export type PracticeData = {
  settings: Settings;
  page: {
    heroMeta?: string;
    heroTitle?: string;
    heroSub?: string;
    cta: SanityCta;
  } | null;
  practices: PracticeItem[];
};

export type ContactData = {
  settings: Settings;
  page: {
    heading?: string;
    copy?: string;
    calendlyUrl?: string;
    calendlyLabel?: string;
    writeLabel?: string;
  } | null;
};

export type NotFoundData = {
  settings: Settings;
  page: {
    code?: string;
    heading?: string;
    copy?: string;
    buttonLabel?: string;
  } | null;
};
