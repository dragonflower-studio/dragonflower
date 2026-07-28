import { defineType, defineField } from "sanity";

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "figure",
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "link",
    }),
  ],
  preview: {
    select: { title: "heading", media: "image" },
  },
});
