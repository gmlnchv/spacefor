import { runQuery } from '~/lib/sanity';
import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd';

export async function getSlugs() {
  return runQuery(
    q('*')
      .filter('defined(slug.current)')
      .grab(
        {
          slug: q.slug('slug'),
        },
        {
          '_type == "post"': {
            _type: q.string(),
            slug: ["select('/editorial/posts/' + slug.current)", q.string()],
          },
          '_type == "space"': {
            _type: q.string(),
            slug: ["select('/spaces/' + slug.current)", q.string()],
          },
          '_type == "category"': {
            _type: q.string(),
            slug: ["select('/editorial/' + slug.current)", q.string()],
          },
        }
      )
  );
}
