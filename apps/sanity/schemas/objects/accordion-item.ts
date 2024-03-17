import { defineField, defineType } from 'sanity';
import { SelectIcon } from '@sanity/icons';

export default defineType({
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'object',
  icon: SelectIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
