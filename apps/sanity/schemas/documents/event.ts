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
      name: 'is_coming_soon',
      title: 'Coming Soon',
      type: 'boolean',
      description: 'Show this event as coming soon.',
      initialValue: false,
    }),
    defineField({
      name: 'start_date',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      hidden: ({ document }): boolean => document?.is_coming_soon as boolean,
      // Require a start date if the event is not coming soon
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (!field && !context.document?.is_coming_soon) {
            return 'Start date is required';
          }
          return true;
        }),
    }),
    defineField({
      name: 'end_date',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      hidden: ({ document }): boolean => document?.is_coming_soon as boolean,
      // Require an end date if the event is not coming soon, and the start date is set. Also require the end date to be after the start date.
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (
            !field &&
            !context.document?.is_coming_soon &&
            context.document?.start_date
          ) {
            return 'End date is required';
          }
          if (
            field &&
            context.document?.start_date &&
            new Date(field as string) <
              new Date(context.document?.start_date as string)
          ) {
            return 'End date must be after start date';
          }
          return true;
        }),
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
        title,
        subtitle: `${subtitle} - ${start_date} - ${end_date}`,
      };
    },
  },
});
