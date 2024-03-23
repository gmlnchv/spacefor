import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd';
import { accordionItemSelection } from './accordion-item';
import { seo } from './seo';

export const spaceSelection = {
  ...seo,
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
  address: q.string(),
  city: q.string(),
  indexDescription: q.string(),
  image: sanityImage('mainImage', {
    withAsset: ['base', 'blurHash', 'dimensions'],
  }).nullable(),
  accordionList: q('accordionList')
    .grab$({
      title: q.string(),
      items: q.array(q.object(accordionItemSelection)),
    })
    .nullable(),
} satisfies Selection;

export type SpaceProps = TypeFromSelection<typeof spaceSelection>;
