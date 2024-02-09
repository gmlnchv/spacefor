import { q, sanityImage, type TypeFromSelection } from 'groqd'
import { runQuery } from '~/lib/sanity'

const hero = {
  "_type == 'hero'": {
    title: q.string(),
    subtitle: q.string(),
    image: sanityImage('image', {
      withAsset: ['base', 'blurHash', 'dimensions'],
    }),
  },
}

const components = {
  components: q('coalesce(components, [])')
    .filter()
    .grab$(
      {
        _type: q.string(),
        _key: q.string(),
      },
      {
        ...hero,
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

export type Page = TypeFromSelection<typeof pageSelection>
