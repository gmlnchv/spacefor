import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export default defineType({
  name: 'retailer',
  title: 'Retailer',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Upload a PNG file with a transparent background, or a SVG.',
      options: {
        accept: 'image/svg+xml, image/png',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
