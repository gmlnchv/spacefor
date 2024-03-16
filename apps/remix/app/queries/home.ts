import { testimonials } from './testimonials';
import { runQuery } from '~/lib/sanity.ts';
import { InferType, q, sanityImage } from 'groqd';
import { meta } from '~/queries/meta.ts';
import { seo } from '~/queries/seo.ts';
import { heroSelection } from './page';
import { retailerSelection } from './retailer';
import { eventSelection } from '~/queries/event.ts';
import { postSelection } from '~/queries/post.ts';

const pageQuery = q('*')
  .filterByType('homePage')
  .grab$(
    {
      ...meta,
      ...seo,
      hero: q('hero').grab$({
        _type: q.string(),
        ...heroSelection,
      }),
      images: sanityImage('images', {
        isList: true,
        withAsset: ['base', 'blurHash', 'dimensions'],
        additionalFields: {
          captionTitle: q.string(),
          captionDescription: q.string().nullable(),
        },
      }).nullable(),
    },
    {
      includeTestimonials: testimonials,
    }
  )
  .slice(0);

const postsQuery = q('*')
  .filterByType('post')
  .filter('category->title == "Meet the Founder"')
  .order('publishedAt desc')
  .slice(0, 3)
  .grab$(postSelection);

const retailersQuery = q('*').filterByType('retailer').grab$(retailerSelection);
const eventsQuery = q('*')
  .filterByType('event')
  .order('start_date desc')
  .grab$(eventSelection);

const homeQuery = q('').grab({
  page: pageQuery,
  posts: postsQuery,
  retailers: retailersQuery,
  events: eventsQuery,
});

export async function getHomePage() {
  return runQuery(homeQuery);
}

export type HomePageProps = InferType<typeof homeQuery>;
