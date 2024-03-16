import { runQuery } from '~/lib/sanity.ts'
import { q } from 'groqd'
import { meta } from '~/queries/meta.ts'
import { seo } from '~/queries/seo.ts'

const query = q('*')
  .filterByType('contactPage')
  .grab$({
    ...meta,
    ...seo,
    body: q.array(q.contentBlock()),
  })
  .slice(0)

export async function getContactPage() {
  return runQuery(query)
}
