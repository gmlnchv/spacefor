import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

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
    {
      title: 'Primary navigation',
      name: 'primaryNav',
      description: 'Select primary navigation',
      type: 'reference',
      to: { type: 'navigation' },
    },
  ],
})