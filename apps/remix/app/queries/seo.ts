import { q, sanityImage, type Selection } from 'groqd';

export const seo = {
  seo: q('seo').grab$({
    title: q.string(),
    description: q.string().optional(),
    image: sanityImage('image', {
      withAsset: ['base'],
    }).nullable(),
  }),
} satisfies Selection;
