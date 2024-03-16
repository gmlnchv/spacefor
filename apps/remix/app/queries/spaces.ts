import {
  q,
  type InferType,
  type TypeFromSelection,
  sanityImage,
  type Selection,
} from 'groqd';
import { runQuery } from '~/lib/sanity';

import { meta } from '~/queries/meta.ts';
import { seo } from '~/queries/seo.ts';
import { spaceSelection } from './space';
import { postSelection } from './post';

const spacesQuery = q('*').filterByType('space').grab$(spaceSelection);

const postsQuery = q('*')
  .filterByType('post')
  .filter('category->title == "Showcase"')
  .order('publishedAt desc')
  .slice(0, 3)
  .grab$(postSelection);

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
      spaces: spacesQuery,
      posts: postsQuery,
    })
  );
}

const spotSelection: Selection = {
  _key: q.string(),
  description: q.string(),
  x: q.number(),
  y: q.number(),
};

export type SpotProps = TypeFromSelection<typeof spaceSelection>;

const spacePageQuery = q('*')
  .filterByType('space')
  .filter('slug.current == $slug')
  .grab$({
    ...meta,
    ...seo,
    ...spaceSelection,
    specs: q.string().optional(),
    detailDescription: q.array(q.contentBlock()),
    plan: q('spacePlan')
      .grab$({
        description: q.string().optional(),
        image: sanityImage('planImage', {
          withAsset: ['base', 'dimensions'],
        }).nullable(),
        hotspots: q.array(q.object(spotSelection)).nullable(),
      })
      .nullable(),
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

export async function getSpacePage(slug: string) {
  return runQuery(spacePageQuery, { slug });
}

export type SpacePageProps = InferType<typeof spacePageQuery>;
