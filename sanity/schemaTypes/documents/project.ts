import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { THEME_OPTIONS } from "../themes";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "home", title: "Homepage card" },
    { name: "work", title: "Work page card" },
    { name: "detail", title: "Case-study page" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Full title, e.g. "Ethereum — Project Mirror".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "Used for the case-study URL (/work/<slug>).",
    }),
    orderRankField({ type: "project" }),

    defineField({
      name: "cardHeader",
      title: "Card headline",
      type: "text",
      rows: 2,
      group: "home",
      description:
        'Full sentence shown on the homepage, e.g. "Understanding Ethereum\'s current narrative tensions and opportunities".',
    }),
    defineField({
      name: "cardSubheader",
      title: "Card project name",
      type: "string",
      group: "home",
      description: 'Short project name, e.g. "Project Mirror".',
    }),
    defineField({
      name: "cardLogos",
      title: "Client logos",
      type: "array",
      of: [{ type: "brandLogo" }],
      group: "home",
    }),
    defineField({
      name: "cardImage",
      title: "Card image",
      type: "figure",
      group: "home",
    }),

    defineField({
      name: "theme",
      title: "Work-page theme",
      type: "string",
      options: { list: THEME_OPTIONS },
      initialValue: "theme-cream",
      group: "work",
    }),
    defineField({
      name: "indexTagline",
      title: "Work-page tagline",
      type: "text",
      rows: 3,
      group: "work",
    }),
    defineField({
      name: "indexBody",
      title: "Work-page body",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "work",
    }),
    defineField({
      name: "indexImage",
      title: "Work-page image",
      type: "figure",
      group: "work",
    }),

    defineField({
      name: "hasDetailPage",
      title: "Publish a full case-study page",
      type: "boolean",
      initialValue: false,
      group: "detail",
      description:
        "When on, a /work/<slug> page is generated from the fields below.",
    }),
    defineField({
      name: "detailTagline",
      title: "Case-study tagline",
      type: "text",
      rows: 3,
      group: "detail",
      hidden: ({ parent }) => !parent?.hasDetailPage,
    }),
    defineField({
      name: "detailCollaborators",
      title: "Collaborators line",
      type: "text",
      rows: 2,
      group: "detail",
      hidden: ({ parent }) => !parent?.hasDetailPage,
    }),
    defineField({
      name: "detailImage",
      title: "Case-study hero image",
      type: "figure",
      group: "detail",
      hidden: ({ parent }) => !parent?.hasDetailPage,
    }),
    defineField({
      name: "chapters",
      title: "Chapters",
      type: "array",
      of: [{ type: "chapter" }],
      group: "detail",
      hidden: ({ parent }) => !parent?.hasDetailPage,
    }),
    defineField({
      name: "snapshotsHeading",
      title: "Snapshots heading",
      type: "string",
      group: "detail",
      hidden: ({ parent }) => !parent?.hasDetailPage,
    }),
    defineField({
      name: "snapshotsCaption",
      title: "Snapshots caption",
      type: "text",
      rows: 2,
      group: "detail",
      hidden: ({ parent }) => !parent?.hasDetailPage,
    }),
    defineField({
      name: "snapshotsImages",
      title: "Snapshot images",
      type: "array",
      of: [{ type: "figure" }],
      group: "detail",
      hidden: ({ parent }) => !parent?.hasDetailPage,
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "title", subtitle: "cardSubheader", media: "cardImage" },
  },
});
