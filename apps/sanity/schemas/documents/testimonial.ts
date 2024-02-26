import { defineField, defineType } from 'sanity';
import { OkHandIcon } from '@sanity/icons';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: OkHandIcon,
  fields: [
    defineField({
      name: 'retailer',
      title: 'Retailer',
      type: 'reference',
      to: [{ type: 'retailer' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'show',
      title: 'Show on site',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'retailer.title',
      subtitle: 'quote',
      show: 'show',
    },
    prepare({ title, subtitle, show }) {
      return {
        // include status in the preview
        title: `${title} (${show ? 'Show' : 'Hide'})`,
        subtitle,
      };
    },
  },
});
