import { defineType, defineField } from "sanity";

export const figure = defineType({
  name: "figure",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describes the image for screen readers and SEO.",
    }),
  ],
});
