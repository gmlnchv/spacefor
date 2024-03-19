import { q, type Selection } from 'groqd';

export const meta = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
} satisfies Selection;
