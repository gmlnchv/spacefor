import { q, sanityImage, type TypeFromSelection, type Selection } from 'groqd';
import { callToActionSelection } from './call-to-action';

export const heroSelection = {
  title: q.string(),
  description: q.string().nullable(),
  image: sanityImage('image', {
    withAsset: ['base', 'blurHash', 'dimensions'],
    additionalFields: {
      alt: q.string(),
    },
  }).nullable(),
  callToAction: q('callToAction').grab(callToActionSelection).nullable(),
} satisfies Selection;

export type HeroProps = TypeFromSelection<typeof heroSelection>;
