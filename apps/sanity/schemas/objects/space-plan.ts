import { defineArrayMember, defineField, defineType } from 'sanity';
import { CircleIcon } from '@sanity/icons';

export default defineType({
  name: 'spacePlan',
  title: 'Space Plan',
  type: 'object',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'planImage',
      title: 'Plan Image',
      type: 'image',
    }),
    defineField({
      name: 'hotspots',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'spot',
          type: 'object',
          icon: CircleIcon,
          fieldsets: [{ name: 'position', options: { columns: 2 } }],
          fields: [
            {
              name: 'description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'x',
              type: 'number',
              readOnly: true,
              fieldset: 'position',
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
            {
              name: 'y',
              type: 'number',
              readOnly: true,
              fieldset: 'position',
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
          ],
          preview: {
            select: {
              title: 'description',
              x: 'x',
              y: 'y',
            },
            prepare({ title, x, y }) {
              return {
                title,
                subtitle: x && y ? `${x}% x ${y}%` : `No position set`,
              };
            },
          },
        }),
      ],
      options: {
        imageHotspot: {
          imagePath: 'planImage',
          pathRoot: 'parent',
          descriptionPath: 'details',
          // see `Custom tooltip` setup below
          tooltip: undefined,
        },
      },
    }),
  ],
});
