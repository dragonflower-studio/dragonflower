import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      initialValue: "Dragonflower Studio",
      description: "Used in the footer legal line and wordmark label.",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation links",
      type: "array",
      of: [{ type: "link" }],
      description: "Shown in the header and footer sitemap.",
    }),
    defineField({
      name: "bookCall",
      title: '"Book a call" button',
      type: "link",
    }),
    defineField({
      name: "footerLead",
      title: "Footer lead line",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
