import { q, type TypeFromSelection, type Selection } from 'groqd'
import { runQuery } from '~/lib/sanity'

import meta from '~/queries/meta.ts'
import seo from '~/queries/seo.ts'

export async function getSpacesPage() {
  return runQuery(
    q('*')
      .filterByType('spacesPage')
      .grab$({
        ...meta,
        ...seo,
        header: q.object({
          title: q.string().optional(),
          description: q.array(q.contentBlock()),
        }),
      })
      .slice(0),
  )
}
