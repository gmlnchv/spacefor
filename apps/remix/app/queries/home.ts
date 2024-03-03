import { testimonials } from './testimonials'
import { runQuery } from '~/lib/sanity.ts'
import { q } from 'groqd'
import { meta } from '~/queries/meta.ts'
import { seo } from '~/queries/seo.ts'
import { heroSelection } from './page'
import { retailerSelection } from './retailer'
import { eventSelection } from '~/queries/event.ts'
import { postSelection } from '~/queries/post.ts'

const homeQuery = q('').grab({
  page: q('*')
    .filterByType('homePage')
    .grab$(
      {
        ...meta,
        ...seo,
        hero: q('hero').grab$({
          _type: q.string(),
          ...heroSelection,
        }),
      },
      {
        includeTestimonials: testimonials,
      },
    )
    .slice(0),
  posts: q('*')
    .filterByType('post')
    .filter('category->title == "Meet the Founder"')
    .order('publishedAt desc')
    .slice(0, 3)
    .grab$(postSelection),
  retailers: q('*').filterByType('retailer').grab$(retailerSelection),
  events: q('*')
    .filterByType('event')
    .order('start_date desc')
    .grab$(eventSelection),
})

export async function getHomePage() {
  return runQuery(homeQuery)
}
