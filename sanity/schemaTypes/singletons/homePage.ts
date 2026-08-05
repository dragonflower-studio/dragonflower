import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Intro" },
    { name: "showcase", title: "Showcase" },
    { name: "testimonials", title: "Testimonials" },
    { name: "work", title: "Selected work" },
    { name: "practice", title: "Practice" },
    { name: "cta", title: "Call to action" },
  ],
  fields: [
    defineField({ name: "heroHeading", title: "Hero heading", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroBody", title: "Hero body", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimary", title: "Button", type: "link", group: "hero" }),
    defineField({
      name: "clientsLabel",
      title: "Clients marquee label",
      type: "string",
      group: "hero",
      description: "Clients themselves are managed under “Clients / Collaborators”.",
    }),

    defineField({ name: "breatherStatement", title: "Statement", type: "text", rows: 2, group: "intro" }),
    defineField({ name: "breatherLead", title: "Lead paragraph", type: "text", rows: 3, group: "intro" }),
    defineField({ name: "breatherCta", title: "Button", type: "link", group: "intro" }),
    defineField({ name: "founderName", title: "Founder name", type: "string", group: "intro" }),
    defineField({ name: "founderRole", title: "Founder role", type: "string", group: "intro" }),
    defineField({ name: "founderPortrait", title: "Founder portrait", type: "figure", group: "intro" }),

    defineField({ name: "showcaseDesktop", title: "Showcase image (desktop)", type: "figure", group: "showcase" }),
    defineField({ name: "showcaseMobile", title: "Showcase image (mobile)", type: "figure", group: "showcase" }),

    defineField({ name: "testimonialsLabel", title: "Section label", type: "string", group: "testimonials" }),
    defineField({ name: "testimonialsCta", title: "Button", type: "link", group: "testimonials" }),

    defineField({ name: "workHeading", title: "Section heading", type: "string", group: "work" }),

    defineField({ name: "practiceIntroHeading", title: "Intro heading", type: "text", rows: 2, group: "practice" }),
    defineField({ name: "practiceOverviewStatement", title: "Overview statement", type: "string", group: "practice" }),
    defineField({ name: "practiceOverviewBody", title: "Overview paragraph", type: "text", rows: 5, group: "practice", description: "Shown beside the cycle graph in the overview card." }),

    defineField({ name: "cta", title: "Call to action", type: "ctaBlock", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
