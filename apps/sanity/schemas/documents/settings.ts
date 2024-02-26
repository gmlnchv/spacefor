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
  ],
});
