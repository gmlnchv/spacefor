import { testimonialSelection } from './testimonials';
import { runQuery } from '~/lib/sanity.ts';
import { InferType, q, sanityImage } from 'groqd';
import { meta } from '~/queries/meta.ts';
import { seo } from '~/queries/seo.ts';
import { heroSelection } from './hero';
import { retailerSelection } from './retailer';
import { eventSelection } from '~/queries/event.ts';
import { postSelection } from '~/queries/post.ts';

const pageQuery = q('*')
  .filterByType('homePage')
  .grab$({
    ...meta,
    ...seo,
    hero: q('hero').grab$({
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
  })
  .slice(0);

const postsQuery = q('*')
  .filterByType('post')
  .filter('category->title == "Meet the Founder"')
  .order('publishedAt desc')
  .slice(0, 3)
  .grab$(postSelection);

const retailersQuery = q('*')
  .filterByType('retailer')
  .filter('isFeatured == true')
  .grab$(retailerSelection);

const eventsQuery = q('*')
  .filterByType('event')
  .order('end_date desc')
  .grab$(eventSelection);

const testimonialsQuery = q('*')
  .filterByType('testimonial')
  .filter('show == true')
  .order('_createdAt desc')
  .slice(0, 1)
  .grab$(testimonialSelection);

const homeQuery = q('').grab({
  page: pageQuery,
  posts: postsQuery,
  events: eventsQuery,
  retailers: retailersQuery,
  testimonials: testimonialsQuery,
});

export async function getHomePage() {
  return runQuery(homeQuery);
}

export type HomePageProps = InferType<typeof homeQuery>;
