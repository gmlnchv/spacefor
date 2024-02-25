import { defineArrayMember, defineField, defineType } from 'sanity';
import { PinIcon } from '@sanity/icons';

export default defineType({
  name: 'space',
  title: 'Space',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'indexDescription',
      title: 'Description (Index)',
      description:
        'This is the description that will be shown in the index page',
      type: 'text',
    }),
    defineField({
      name: 'detailDescription',
      title: 'Description (Detail)',
      description:
        'This is the description that will be shown in the detail page',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          styles: [], // Remove styles to prevent inline formatting
          lists: [], // Remove lists to prevent ordered and unordered lists
          marks: {
            // Only allow plain text
            annotations: [],
            decorators: [],
          },
        }),
      ],
    }),
    defineField({
      name: 'specs',
      title: 'Specs',
      description:
        'This is the description that will be shown in the detail page',
      placeholder: '32 m2, including front of house and stock room',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Additional images',
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          fields: [
            defineField({
              name: 'captionTitle',
              title: 'Caption Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'captionDescription',
              title: 'Caption Description',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'spacePlan',
      title: 'Plan',
      type: 'spacePlan',
    }),
  ],
});
