import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "text", rows: 2 }),
    defineField({ name: "copy", title: "Copy", type: "text", rows: 3 }),
    defineField({ name: "calendlyUrl", title: "Booking URL", type: "string" }),
    defineField({
      name: "calendlyLabel",
      title: "Booking button label",
      type: "string",
      initialValue: "Book a call",
    }),
    defineField({
      name: "writeLabel",
      title: '"Write to us" label',
      type: "string",
      initialValue: "Write to us",
    }),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});
