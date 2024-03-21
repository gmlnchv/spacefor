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
import { accordionItemSelection } from './accordion-item';
import { testimonialSelection } from './testimonials';

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
          accordionList: q('accordionList')
            .grab$({
              title: q.string(),
              items: q.array(q.object(accordionItemSelection)),
            })
            .nullable(),
        })
        .slice(0),
      spaces: spacesQuery,
      posts: postsQuery,
    })
  );
}

const spotSelection = {
  _key: q.string(),
  description: q.string(),
  x: q.number(),
  y: q.number(),
} satisfies Selection;

export type SpotProps = TypeFromSelection<typeof spotSelection>;

const spaceQuery = q('*')
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
    accordionList: q('accordionList')
      .grab$({
        title: q.string(),
        items: q.array(q.object(accordionItemSelection)),
      })
      .nullable(),
  })
  .slice(0);

const testimonialsQuery = q('*')
  .filterByType('testimonial')
  .filter('show == true')
  .order('_createdAt desc')
  .slice(0, 1)
  .grab$(testimonialSelection);

const spacePageQuery = q('').grab({
  space: spaceQuery,
  testimonials: testimonialsQuery,
});

export async function getSpacePage(slug: string) {
  return runQuery(spacePageQuery, { slug });
}

export type SpacePageProps = InferType<typeof spacePageQuery>;
