import { defineField, defineType } from 'sanity';
import { StackIcon } from '@sanity/icons';

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
    }),
  ],
});
