import { q, type TypeFromSelection, type Selection } from 'groqd';
import { runQuery } from '~/lib/sanity';

const NavigationItemSelection: Selection = {
  _key: q.string(),
  label: q.string(),
  link: q('link').grab({
    isExternal: q('type == "external"'),
    href: q.select({
      'type == "internal"': q('internal').deref().grabOne('slug.current'),
      'type == "external"': q('external'),
    }),
  }),
};

export type NavigationItemProps = TypeFromSelection<
  typeof NavigationItemSelection
>;

export async function getGlobalData() {
  return runQuery(
    q('').grab({
      settings: q('*')
        .filterByType('settings')
        .grab$({
          siteTitle: q.string().optional(),
          primaryNav: q('primaryNav')
            .deref()
            .grab$({
              items: q('items').filter().grab(NavigationItemSelection),
            })
            .nullable(),
          mobileNav: q('mobileNav')
            .deref()
            .grab$({
              items: q('items').filter().grab(NavigationItemSelection),
            })
            .nullable(),
        })
        .slice(0),
    })
  );
}