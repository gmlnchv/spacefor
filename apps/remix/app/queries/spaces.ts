import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd'
import { runQuery } from '~/lib/sanity'

import meta from '~/queries/meta.ts'
import seo from '~/queries/seo.ts'

const spaceSelection = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
  address: q.string(),
  city: q.string(),
  indexDescription: q.string(),
  image: sanityImage('mainImage', {
    withAsset: ['base', 'blurHash', 'dimensions'],
  }).nullable(),
} satisfies Selection

export type SpaceProps = TypeFromSelection<typeof spaceSelection>

export async function getSpacesPage() {
  return runQuery(
    q('').grab({
      page: q('*')
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
      spaces: q('*').filterByType('space').grab$(spaceSelection),
    }),
  )
}
