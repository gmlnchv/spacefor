import { q } from 'groqd'

export default {
  seo: q
    .object({
      title: q.string(),
      description: q.string().optional(),
    })
    .optional(),
}
