import { q, sanityImage, type Selection, type TypeFromSelection } from 'groqd';

export const retailerSelection = {
  _id: q.string(),
  title: q.string(),
  logo: sanityImage('logo', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  image: sanityImage('image', {
    withAsset: ['base', 'blurHash', 'dimensions'],
  }).nullable(),
} satisfies Selection;

export type RetailerProps = TypeFromSelection<typeof retailerSelection>;
