import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'retailer',
      title: 'Retailer',
      type: 'reference',
      to: [{ type: 'retailer' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'space',
      title: 'Space',
      type: 'reference',
      to: [{ type: 'space' }],
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'start_date',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
    defineField({
      name: 'end_date',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (Rule) =>
        Rule.required()
          .min(Rule.valueOfField('start_date'))
          .error('End date must be after start date'),
    }),
  ],

  preview: {
    select: {
      title: 'retailer.title',
      subtitle: 'space.title',
      start_date: 'start_date',
      end_date: 'end_date',
    },
    prepare(selection) {
      const { title, subtitle, start_date, end_date } = selection;
      return {
        title: title,
        subtitle: `${subtitle} - ${start_date} - ${end_date}`,
      };
    },
  },
});
