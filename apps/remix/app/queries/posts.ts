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

export async function getEditorialPage() {
  return runQuery(
    q('').grab({
      page: q('*')
        .filterByType('editorialPage')
        .grab$({
          ...meta,
          ...seo,
        })
        .slice(0),
      posts: q('*').filterByType('post')
          .order('publishedAt desc')
          .grab$(postSelection),
    })
  );
}
