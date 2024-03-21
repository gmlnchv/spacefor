import { q, type TypeFromSelection, type Selection } from 'groqd';
import { runQuery } from '~/lib/sanity';
import { linkSelection } from './link';

const navigationItemSelection = {
  _key: q.string(),
  label: q.string(),
  link: q('link').grab(linkSelection),
} satisfies Selection;

export type NavigationItemProps = TypeFromSelection<
  typeof navigationItemSelection
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
              items: q('items').filter().grab(navigationItemSelection),
            })
            .nullable(),
          mobileNav: q('mobileNav')
            .deref()
            .grab$({
              items: q('items').filter().grab(navigationItemSelection),
            })
            .nullable(),
          instagram: q.string().optional(),
        })
        .slice(0),
      footer: q('*')
        .filterByType('footer')
        .grab$({
          footerText: q.string().optional(),
        })
        .slice(0),
    })
  );
}