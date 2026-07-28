import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "studio", title: "Studio" },
    { name: "transform", title: "Shifts" },
    { name: "method", title: "Method" },
    { name: "cta", title: "Call to action" },
  ],
  fields: [
    defineField({ name: "heroHeading", title: "Hero heading", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroCopy", title: "Hero copy", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroCta", title: "Button", type: "link", group: "hero" }),

    defineField({ name: "studioTitle", title: "Section title", type: "string", group: "studio" }),
    defineField({ name: "studioLead", title: "Lead", type: "text", rows: 3, group: "studio" }),
    defineField({ name: "studioBody", title: "Body", type: "text", rows: 3, group: "studio" }),
    defineField({ name: "founderBio", title: "Founder bio", type: "text", rows: 3, group: "studio" }),
    defineField({ name: "founderName", title: "Founder name", type: "string", group: "studio" }),
    defineField({ name: "founderRole", title: "Founder role", type: "string", group: "studio" }),
    defineField({ name: "studioPortrait", title: "Portrait", type: "figure", group: "studio" }),

    defineField({ name: "transformHeading", title: "Heading", type: "text", rows: 2, group: "transform" }),
    defineField({
      name: "transformPairs",
      title: "Shifts",
      type: "array",
      of: [{ type: "transformPair" }],
      group: "transform",
    }),

    defineField({ name: "methodTitle", title: "Section title", type: "string", group: "method" }),
    defineField({
      name: "methodSteps",
      title: "Steps",
      type: "array",
      of: [{ type: "methodStep" }],
      group: "method",
    }),
    defineField({ name: "methodCta", title: "Button", type: "link", group: "method" }),

    defineField({ name: "cta", title: "Call to action", type: "ctaBlock", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
