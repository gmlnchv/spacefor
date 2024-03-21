import { BookingBannerProps } from './queries/booking-banner';
import { NavigationItemProps } from './queries/global';

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
  };
}
