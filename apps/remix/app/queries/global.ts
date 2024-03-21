import { q, type TypeFromSelection, type Selection, sanityImage } from 'groqd';
import { runQuery } from '~/lib/sanity';
import { linkSelection } from './link';
import { callToActionSelection } from './call-to-action';
import { bookingBannerSelection } from './booking-banner';

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
          bookingBanner: q('bookingBanner')
            .grab$(bookingBannerSelection)
            .nullable(),
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
