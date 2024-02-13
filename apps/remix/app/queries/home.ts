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
          }).nullable(),
          image: sanityImage('image', {
            withAsset: ['base', 'blurHash', 'dimensions'],
          }).nullable(),
        }),
    })
  );
}
