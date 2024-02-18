import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd';
import { runQuery } from '~/lib/sanity';

import { meta } from '~/queries/meta.ts';
import { seo } from '~/queries/seo.ts';
import { spaceSelection } from './space';

export async function getSpacesPage() {
  return runQuery(
    q('').grab({
      page: q('*')
        .filterByType('spacesPage')
        .grab$({
          ...meta,
          ...seo,
          header: q.object({
            title: q.string().optional(),
            description: q.array(q.contentBlock()),
          }),
        })
        .slice(0),
      spaces: q('*').filterByType('space').grab$(spaceSelection),
    })
  );
}

export async function getSpacePage(slug: string) {
  return runQuery(
    q('*')
      .filterByType('space')
      .filter('slug.current == $slug')
      .grab$({
        ...meta,
        detailDescription: q.array(q.contentBlock()),
        image: sanityImage('mainImage', {
          withAsset: ['base', 'blurHash', 'dimensions'],
        }).nullable(),
      })
      .slice(0),
    { slug }
  );
}
