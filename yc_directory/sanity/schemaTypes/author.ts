import { defineField, defineType } from "sanity";

// Use a simple string for the icon instead of the lucide-react component
// This avoids the ES Module/CommonJS conflict

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: () => "👤", // Simple emoji icon instead of lucide component
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
