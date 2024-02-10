import { defineArrayMember, defineField, defineType } from 'sanity'
import pageSchema from './page'
import { PinIcon } from '@sanity/icons'

export default defineType({
  ...pageSchema,
  name: 'spacesPage',
  title: 'Spaces',
  type: 'document',
  icon: PinIcon,
  fields: pageSchema.fields
    // remove components field
    .filter((field) => field.name !== 'components')
    // overwrite slug field options
    .map((field) => {
      if (field.name === 'slug') {
        return {
          ...field,
          readOnly: true,
          initialValue: {
            current: '/spaces',
          },
        }
      }
      return field
    })
    .concat([
      defineType({
        name: 'header',
        title: 'Header',
        type: 'object',
        group: 'content',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
          }),
          defineField({
            name: 'description',
            title: 'Description',
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
        ],
      }),
    ]),
})
