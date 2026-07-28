import { defineType, defineField } from "sanity";

export const practicePage = defineType({
  name: "practicePage",
  title: "Practice page",
  type: "document",
  fields: [
    defineField({ name: "heroMeta", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero title", type: "text", rows: 2 }),
    defineField({ name: "heroSub", title: "Hero subtitle", type: "text", rows: 3 }),
    defineField({ name: "cta", title: "Call to action", type: "ctaBlock" }),
  ],
  preview: { prepare: () => ({ title: "Practice page" }) },
});
