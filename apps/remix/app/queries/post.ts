import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd';

export const postSelection: Selection = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
  excerpt: q.string(),
  category: q('category')
    .deref()
    .grab$({
      title: q.string(),
      slug: q.slug('slug'),
    }),
  publishedAt: q.date(),
  image: sanityImage('mainImage', {
    withAsset: ['base', 'blurHash', 'dimensions'],
  }),
};

export type PostProps = TypeFromSelection<typeof postSelection>;
