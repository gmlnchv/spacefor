import { runQuery } from '~/lib/sanity.ts';
import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd';
import meta from '~/queries/meta.ts';
import seo from '~/queries/seo.ts';
import { heroSelection } from './page';

const retailerSelection = {
  _id: q.string(),
  title: q.string(),
  logo: sanityImage('logo', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
} satisfies Selection;

export type RetailerProps = TypeFromSelection<typeof retailerSelection>;

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
      retailers: q('*')
        .filterByType('retailer')
        .grab$({
          _id: q.string(),
          title: q.string(),
          logo: sanityImage('logo', {
            withAsset: ['base', 'dimensions'],
          }),
          image: sanityImage('image', {
            withAsset: ['base', 'blurHash', 'dimensions'],
          }),
        }),
      events: q('*')
        .filterByType('event')
        .grab$({
          _id: q.string(),
          start_date: q.date(),
          end_date: q.date(),
          retailer: q('retailer')
            .deref()
            .grab$({
              title: q.string(),
              logo: sanityImage('logo', {
                withAsset: ['base', 'dimensions'],
              }),
            }),
          space: q('space')
            .deref()
            .grab$({
              title: q.string(),
              slug: q.slug('slug'),
            }),
        }),
    })
  );
}
