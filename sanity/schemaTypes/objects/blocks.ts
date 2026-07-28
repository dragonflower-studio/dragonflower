import { defineType, defineField } from "sanity";

export const transformPair = defineType({
  name: "transformPair",
  title: "Shift",
  type: "object",
  fields: [
    defineField({ name: "from", title: "From", type: "string", validation: (r) => r.required() }),
    defineField({ name: "to", title: "To", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
  ],
  preview: {
    select: { from: "from", to: "to" },
    prepare: ({ from, to }) => ({ title: `${from} → ${to}` }),
  },
});

export const methodStep = defineType({
  name: "methodStep",
  title: "Method step",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "promise", title: "Promise", type: "text", rows: 2 }),
    defineField({ name: "capabilities", title: "Capabilities", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "name", subtitle: "promise" } },
});

export const approachItem = defineType({
  name: "approachItem",
  title: "Approach item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const chapter = defineType({
  name: "chapter",
  title: "Chapter",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "lead", title: "Lead sentence", type: "text", rows: 2 }),
    defineField({ name: "emphasis", title: "Emphasis line", type: "string" }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "quotes",
      title: "Pull quotes",
      type: "array",
      of: [{ type: "text", rows: 2 }],
    }),
  ],
  preview: { select: { title: "label" } },
});
