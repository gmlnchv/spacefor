import { q, sanityImage, type TypeFromSelection, type Selection } from 'groqd'
import { runQuery } from '~/lib/sanity'

import meta from '~/queries/meta.ts'
import seo from '~/queries/seo.ts'

export const heroSelection = {
  title: q.string(),
  description: q.string(),
  image: sanityImage('image', {
    withAsset: ['base', 'blurHash', 'dimensions'],
    additionalFields: {
      alt: q.string(),
    },
  }).nullable(),
} satisfies Selection

export interface HeroProps extends TypeFromSelection<typeof heroSelection> {
  _type: 'hero'
  _key: string
}

const components = {
  components: q('coalesce(components, [])').filter().grab$(
    {
      _type: q.string(),
      _key: q.string(),
    },
    {
      "_type == 'hero'": heroSelection,
    },
  ),
}

export async function getPageBySlug(slug: string) {
  return runQuery(
    q('*')
      .filterByType('page')
      .filter('slug.current == $slug')
      .grab$({
        ...meta,
        ...seo,
        ...components,
        slug: q.slug('slug'),
      })
      .slice(0),
    { slug },
  )
}

export async function getPageByType(pageType: string) {
  return runQuery(
    q('*')
      .filterByType(pageType)
      .grab$({
        ...meta,
        ...seo,
        ...components,
      })
      .slice(0),
    { pageType },
  )
}
