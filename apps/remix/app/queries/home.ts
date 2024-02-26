import { testimonials } from './testimonials';
import { runQuery } from '~/lib/sanity.ts';
import {
  q,
  type InferType,
  type Selection,
  type TypeFromSelection,
} from 'groqd';
import { meta } from '~/queries/meta.ts';
import { seo } from '~/queries/seo.ts';
import { heroSelection } from './page';
import { retailerSelection } from './retailer';

const eventSelection: Selection = {
  _id: q.string(),
  start_date: q.date(),
  end_date: q.date(),
  retailer: q('retailer').deref().grab$(retailerSelection),
  space: q('space')
    .deref()
    .grab$({
      title: q.string(),
      slug: q.slug('slug'),
    }),
};

export type RetailerProps = TypeFromSelection<typeof retailerSelection>;
export type EventProps = TypeFromSelection<typeof eventSelection>;

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
      }
    )
    .slice(0),
  retailers: q('*').filterByType('retailer').grab$(retailerSelection),
  events: q('*')
    .filterByType('event')
    .order('start_date desc')
    .grab$(eventSelection),
});

export type HomePageProps = InferType<typeof homeQuery>;

export async function getHomePage() {
  return runQuery(homeQuery);
}
