import { q, sanityImage, type Selection } from 'groqd';

export const retailerSelection: Selection = {
  _id: q.string(),
  title: q.string(),
  logo: sanityImage('logo', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  image: sanityImage('image', {
    withAsset: ['base', 'blurHash', 'dimensions'],
  }).nullable(),
};
