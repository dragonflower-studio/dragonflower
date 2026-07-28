import { defineType, defineField } from "sanity";

export const workPage = defineType({
  name: "workPage",
  title: "Work page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero title", type: "string" }),
    defineField({ name: "heroSub", title: "Hero subtitle", type: "text", rows: 2 }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "ctaBlock",
      description: "Also used at the bottom of individual case-study pages.",
    }),
  ],
  preview: { prepare: () => ({ title: "Work page" }) },
});
