import { q, sanityImage, type Selection, type TypeFromSelection } from 'groqd';
import { callToActionSelection } from './call-to-action';

export const bookingBannerSelection = {
  title: q.string().optional(),
  description: q.string().optional(),
  image: sanityImage('image', {
    withAsset: ['base', 'blurHash', 'dimensions'],
    additionalFields: {
      alt: q.string().nullable(),
    },
  }).nullable(),
  callToAction: q('callToAction').grab(callToActionSelection).nullable(),
} satisfies Selection;

export type BookingBannerProps = TypeFromSelection<
  typeof bookingBannerSelection
>;
