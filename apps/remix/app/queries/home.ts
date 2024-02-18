import { runQuery } from '~/lib/sanity.ts';
import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd';
import { meta } from '~/queries/meta.ts';
import { seo } from '~/queries/seo.ts';
import { heroSelection } from './page';

const retailerSelection: Selection = {
  _id: q.string(),
  title: q.string(),
  logo: sanityImage('logo', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  image: sanityImage('image', {
    withAsset: ['base', 'blurHash', 'dimensions'],
  }).nullable(),
};

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

export async function getHomePage() {
  return runQuery(
    q('').grab({
      page: q('*')
        .filterByType('homePage')
        .grab$({
          ...meta,
          ...seo,
          hero: q('hero').grab$({
            _type: q.string(),
            ...heroSelection,
          }),
        })
        .slice(0),
      retailers: q('*').filterByType('retailer').grab$(retailerSelection),
      events: q('*')
        .filterByType('event')
        .order('start_date desc')
        .grab$(eventSelection),
    })
  );
}
