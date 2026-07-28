import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const client = defineType({
  name: "client",
  title: "Client / Collaborator",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "figure",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scale",
      title: "Visual scale",
      type: "number",
      description: "Fine-tune logo size in the marquee. 1 = default.",
      initialValue: 1,
    }),
    orderRankField({ type: "client" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
