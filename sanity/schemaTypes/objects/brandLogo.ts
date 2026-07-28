import { defineType, defineField } from "sanity";

export const brandLogo = defineType({
  name: "brandLogo",
  title: "Logo",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Logo image",
      type: "figure",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scale",
      title: "Visual scale",
      type: "number",
      description: "Fine-tune size relative to other logos. 1 = default.",
      initialValue: 1,
    }),
  ],
  preview: {
    select: { media: "image", title: "image.alt" },
    prepare: ({ media, title }) => ({ media, title: title || "Logo" }),
  },
});
