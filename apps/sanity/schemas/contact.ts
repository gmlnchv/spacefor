import { defineType } from 'sanity'
import pageSchema from './page'
import { DocumentIcon, HomeIcon } from '@sanity/icons'

export default defineType({
  ...pageSchema,
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  // overwrite slug field options
  fields: pageSchema.fields.map((field) => {
    if (field.name === 'slug') {
      return {
        ...field,
        readOnly: true,
        initialValue: {
          current: '/contact',
        },
      }
    }
    return field
  }),
})
