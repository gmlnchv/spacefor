import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd';

export const postSelection = {
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
  publishedAt: q.string(),
  image: sanityImage('mainImage', {
    withAsset: ['base', 'blurHash', 'dimensions'],
    additionalFields: {
      alt: q.string().nullable(),
      caption: q.string().nullable(),
    },
  }),
} satisfies Selection;

export type PostProps = TypeFromSelection<typeof postSelection>;
