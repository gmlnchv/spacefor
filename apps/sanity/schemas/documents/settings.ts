import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      title: 'Primary navigation',
      name: 'primaryNav',
      description: 'Select primary navigation',
      type: 'reference',
      to: { type: 'navigation' },
    }),
    defineField({
      title: 'Mobile navigation',
      name: 'mobileNav',
      description: 'Select mobile navigation',
      type: 'reference',
      to: { type: 'navigation' },
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
    }),
    defineField({
      name: 'bookingBanner',
      title: 'Booking Banner',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'callToAction',
          title: 'Call to Action',
          type: 'callToAction',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
