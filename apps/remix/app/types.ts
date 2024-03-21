import { BookingBannerProps } from './queries/booking-banner';
import { NavigationItemProps } from './queries/global';

export interface Context {
  globalData: {
    settings?: {
      primaryNav: { items: NavigationItemProps[] };
      bookingBanner: BookingBannerProps;
    };
  };
}
