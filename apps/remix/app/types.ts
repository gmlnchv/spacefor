import { BookingBannerProps } from './queries/booking-banner';
import { NavigationItemProps } from './queries/global';
import { SpaceProps } from './queries/space';

export interface Context {
  globalData: {
    settings: {
      siteTitle: string;
      instagram: string;
      primaryNav: { items: NavigationItemProps[] };
      bookingBanner: BookingBannerProps;
    };
    footer: {
      footerText: string;
    };
    spaces: SpaceProps['title'][];
  };
}
