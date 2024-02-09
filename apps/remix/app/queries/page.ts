import { q, sanityImage, type TypeFromSelection, type Selection } from 'groqd'
import { runQuery } from '~/lib/sanity'

export const heroSelection = {
  title: q.string(),
  description: q.string(),
  image: sanityImage('image', {
    withAsset: ['base', 'blurHash', 'dimensions'],
    additionalFields: {
      alt: q.string(),
    },
  }),
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

const meta = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
}

const seo = {
  seo: q
    .object({
      title: q.string(),
      description: q.string().optional(),
    })
    .optional(),
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
