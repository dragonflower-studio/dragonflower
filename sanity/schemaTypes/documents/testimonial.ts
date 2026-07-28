import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Attribution",
      type: "string",
      description: "e.g. Fintech Executive, CSO",
      validation: (rule) => rule.required(),
    }),
    orderRankField({ type: "testimonial" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "quote", subtitle: "source" },
  },
});
