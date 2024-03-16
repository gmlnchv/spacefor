import { defineArrayMember, defineField, defineType } from 'sanity';
import pageSchema from './page';
import { HomeIcon } from '@sanity/icons';

export default defineType({
  ...pageSchema,
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // override the slug field to always be '/'
  fields: pageSchema.fields
    // hide the components field
    .filter((field) => field.name !== 'components')
    .map((field) => {
      if (field.name === 'slug') {
        return {
          ...field,
          readOnly: true,
          initialValue: {
            current: '/',
          },
        };
      }
      return field;
    })
    .concat([
      defineField({
        name: 'hero',
        title: 'Hero',
        type: 'hero',
        group: 'content',
      }),
      defineField({
        name: 'images',
        type: 'array',
        title: 'Images',
        group: 'content',
        of: [
          defineArrayMember({
            name: 'image',
            type: 'image',
            fields: [
              defineField({
                name: 'captionTitle',
                title: 'Caption Title',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'captionDescription',
                title: 'Caption Description',
                type: 'string',
              }),
            ],
          }),
        ],
      }),
    ]),
});
