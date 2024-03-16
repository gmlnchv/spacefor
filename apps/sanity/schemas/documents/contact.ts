import { defineArrayMember, defineField, defineType } from 'sanity'
import pageSchema from './page'

export default defineType({
  ...pageSchema,
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  // overwrite slug field options
  fields: pageSchema.fields
    .filter((field) => field.name !== 'components')
    .map((field) => {
      if (field.name === 'slug') {
        return {
          ...field,
          readOnly: true,
          initialValue: {
            current: '/enquire',
          },
        }
      }
      return field
    })
    .concat([
      defineField({
        name: 'body',
        title: 'Body',
        type: 'array',
        group: 'content',
        of: [
          defineArrayMember({
            title: 'Block',
            type: 'block',
            styles: [{ title: 'Normal', value: 'normal' }],
            lists: [], // Remove lists to prevent ordered and unordered lists
            marks: {
              // Only allow plain text
              annotations: [
                {
                  title: 'URL',
                  name: 'link',
                  type: 'object',
                  fields: [
                    {
                      title: 'URL',
                      name: 'href',
                      type: 'url',
                      validation: (Rule) =>
                        Rule.uri({
                          scheme: ['http', 'https', 'mailto'],
                        }),
                    },
                  ],
                },
              ],
              decorators: [],
            },
          }),
        ],
      }),
    ]),
})
