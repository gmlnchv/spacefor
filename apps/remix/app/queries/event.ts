import { q, Selection, type TypeFromSelection } from 'groqd';
import { retailerSelection } from '~/queries/retailer.ts';

export const eventSelection = {
  _id: q.string(),
  start_date: q.string().optional(),
  end_date: q.string().optional(),
  is_coming_soon: q.boolean().default(false),
  retailer: q('retailer').deref().grab$(retailerSelection),
  space: q('space')
    .deref()
    .grab$({
      title: q.string(),
      slug: q.slug('slug'),
    }),
} satisfies Selection;

export type EventProps = TypeFromSelection<typeof eventSelection>;
