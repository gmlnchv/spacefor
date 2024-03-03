import { defineField, defineType } from 'sanity';
import pageSchema from './page';
import { BookIcon } from '@sanity/icons';

export default defineType({
  ...pageSchema,
  name: 'editorialPage',
  title: 'Editorial',
  type: 'document',
  icon: BookIcon,
  // override the slug field to always be '/editorial'
  fields: pageSchema.fields
    // hide the components field
    .filter((field) => field.name !== 'components')
    .map((field) => {
      if (field.name === 'slug') {
        return {
          ...field,
          readOnly: true,
          initialValue: {
            current: '/editorial',
          },
        };
      }
      return field;
    }),
});
