import { q, sanityImage, type TypeFromSelection, type Selection } from 'groqd';

export const heroSelection = {
  title: q.string(),
  description: q.string().nullable(),
  image: sanityImage('image', {
    withAsset: ['base', 'blurHash', 'dimensions'],
    additionalFields: {
      alt: q.string(),
    },
  }).nullable(),
} satisfies Selection;

export type HeroProps = TypeFromSelection<typeof heroSelection>;
