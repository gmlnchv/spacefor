import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Recommended length: between 50 to 60 characters.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Recommended length: between 150 to 160 characters.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Recommended size: 1200x628 pixels.',
      options: {},
    }),
  ],
})
