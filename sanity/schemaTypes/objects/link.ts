import { defineType, defineField } from "sanity";

export const link = defineType({
  name: "link",
  title: "Button / Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destination",
      type: "string",
      description: "An internal path like /contact, or a full URL.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "newTab",
      title: "Open in a new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
