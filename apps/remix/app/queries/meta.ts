import { q, type Selection } from 'groqd';

export const meta: Selection = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
};
