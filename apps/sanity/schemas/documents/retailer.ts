import { defineField, defineType } from 'sanity';
import { BasketIcon } from '@sanity/icons';

export default defineType({
  name: 'retailer',
  title: 'Retailer',
  type: 'document',
  icon: BasketIcon,
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
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this retailer on the homepage.',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});
