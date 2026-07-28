import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { THEME_OPTIONS } from "../themes";

export const practiceItem = defineType({
  name: "practiceItem",
  title: "Practice",
  type: "document",
  groups: [
    { name: "home", title: "Homepage card" },
    { name: "detail", title: "Practice page" },
  ],
  fields: [
    defineField({
      name: "number",
      title: "Number",
      type: "string",
      description: 'e.g. "01".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    orderRankField({ type: "practiceItem" }),
    defineField({
      name: "promise",
      title: "Promise",
      type: "text",
      rows: 2,
      description: "The headline statement shown on both cards.",
    }),

    defineField({
      name: "homeBody",
      title: "Homepage body",
      type: "text",
      rows: 3,
      group: "home",
    }),
    defineField({
      name: "homeTheme",
      title: "Homepage card theme",
      type: "string",
      options: { list: THEME_OPTIONS },
      initialValue: "theme-violet",
      group: "home",
    }),
    defineField({
      name: "landscape",
      title: "Landscape image",
      type: "figure",
      group: "home",
    }),

    defineField({
      name: "detailTheme",
      title: "Practice-page theme",
      type: "string",
      options: { list: THEME_OPTIONS },
      initialValue: "theme-cream",
      group: "detail",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "detail",
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "array",
      of: [{ type: "approachItem" }],
      group: "detail",
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [{ type: "string" }],
      group: "detail",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      of: [{ type: "string" }],
      group: "detail",
    }),
    defineField({
      name: "detailImage",
      title: "Practice-page image",
      type: "figure",
      group: "detail",
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "title", subtitle: "number", media: "landscape" },
  },
});
