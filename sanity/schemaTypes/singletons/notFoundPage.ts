import { defineType, defineField } from "sanity";

export const notFoundPage = defineType({
  name: "notFoundPage",
  title: "404 page",
  type: "document",
  fields: [
    defineField({ name: "code", title: "Code label", type: "string", initialValue: "Error 404" }),
    defineField({ name: "heading", title: "Heading", type: "text", rows: 2 }),
    defineField({ name: "copy", title: "Copy", type: "text", rows: 3 }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string", initialValue: "Back home" }),
  ],
  preview: { prepare: () => ({ title: "404 page" }) },
});
