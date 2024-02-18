import { q } from 'groqd';

export const seo = {
  seo: q
    .object({
      title: q.string(),
      description: q.string().optional(),
    })
    .optional(),
};
