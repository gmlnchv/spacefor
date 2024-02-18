import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd';

export const spaceSelection: Selection = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
  address: q.string(),
  city: q.string(),
  indexDescription: q.string(),
  image: sanityImage('mainImage', {
    withAsset: ['base', 'blurHash', 'dimensions'],
  }).nullable(),
};

export type SpaceProps = TypeFromSelection<typeof spaceSelection>;
