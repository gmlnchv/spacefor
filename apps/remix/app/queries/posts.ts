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
import { postSelection } from './post';

export async function getEditorialPage(category: string) {
  return runQuery(
    q('').grab({
      page: q('*')
        .filterByType('editorialPage')
        .grab$({
          ...meta,
          ...seo,
        })
        .slice(0),
      categories: q('*')
        .filterByType('category')
        .grab$({
          title: q.string(),
          slug: q.slug('slug'),
        }),
      posts: q('*')
        .filterByType('post')
        // check if the post has the category but only if the category is not null
        .filter(
          category
            ? `references(*[_type == "category" && slug.current == $category]._id)`
            : ''
        )
        .order('publishedAt desc')
        .grab$(postSelection),
    }),
    { category }
  );
}
