import { useOutletContext } from '@remix-run/react';
import { Image } from '~/components/image.tsx';
import { Context } from '~/types';
import { BookingForm } from './booking-form';

export const BookingBanner = () => {
  const { globalData }: Context = useOutletContext();

  if (!globalData.settings?.bookingBanner) {
    return null;
  }

  const { title, description, image } = globalData.settings.bookingBanner;

  return (
    <section className="grid md:grid-cols-2">
      {image && (
        <Image
          src={image?.asset.url}
          layout="constrained"
          width={690}
          height={400}
          blurHash={image?.asset.metadata.blurHash}
          className="md:max-w-1/2 h-full max-sm:h-[200px]"
          alt={image?.alt ?? ''}
        />
      )}

      <div className="px-5 py-9 md:p-14 text-white flex flex-col items-start justify-center gap-y-9">
        <h3 className="text-4xl lg:text-6xl">{title}</h3>
        <p>{description}</p>
        <BookingForm />
      </div>
    </section>
  );
};
