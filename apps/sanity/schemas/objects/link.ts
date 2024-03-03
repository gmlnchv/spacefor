import { defineType } from 'sanity';

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'internal',
    },
    {
      name: 'internal',
      title: 'Internal',
      type: 'reference',
      hidden: ({ parent }) => parent?.type !== 'internal',
      to: [
        { type: 'homePage' },
        { type: 'contactPage' },
        { type: 'editorialPage' },
        { type: 'spacesPage' },
        {
          type: 'page',
        },
        {
          type: 'post',
        },
      ],
    },
    {
      name: 'external',
      title: 'External',
      type: 'url',
      hidden: ({ parent }) => parent?.type !== 'external',
      description: 'Use a fully qualified URL (e.g. https://example.com)',
    },
  ],
});
