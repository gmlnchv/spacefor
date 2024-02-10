import { q } from 'groqd'

export default {
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
}
