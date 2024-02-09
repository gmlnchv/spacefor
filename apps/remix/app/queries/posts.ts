import { q, sanityImage, type Selection, type TypeFromSelection } from 'groqd'
import { runQuery } from '~/lib/sanity'

export const postSelection = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug('slug'),
  mainImage: sanityImage('mainImage', {
    withAsset: ['base', 'blurHash', 'dimensions'],
  }),
} satisfies Selection

export async function getPosts() {
  return runQuery(
    q('*', { isArray: true }).filterByType('post').grab(postSelection),
  )
}

export async function getPost(slug: string) {
  return runQuery(
    q('*')
      .filterByType('post')
      .filter('slug.current == $slug')
      .grab({
        ...postSelection,
        seo: q.object({
          title: q.string(),
          description: q.string().optional(),
        }),
      })
      .slice(0),
    { slug },
  )
}

export type Post = TypeFromSelection<typeof postSelection>
