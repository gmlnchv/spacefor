import { HeroProps } from '~/queries/hero';
import { Image } from '~/components/image.tsx';
import { Container } from '~/components/container.tsx';
import { BookingForm } from './booking-form';

const Hero = ({ title, description, image, callToAction }: HeroProps) => {
  return (
    <section className="py-10 md:py-24 max-h-[875px]">
      <Container>
        <div className="flex max-sm:flex-wrap items-center gap-x-4 gap-y-8 justify-between">
          <header className="space-y-8 lg:space-y-14 text-balance md:w-1/2 xl:w-auto max-w-[660px]">
            <h1 className="text-5xl md:text-6xl xl:text-8xl">{title}</h1>
            <p className="text-balance">{description}</p>
            <BookingForm />
          </header>

          {image && (
            <figure className="relative mt-10 sm:mt-0">
              <Image
                src={image.asset.url}
                layout="constrained"
                width={600}
                height={490}
                blurHash={image.asset.metadata.blurHash}
                className="border border-white md:w-1/2 xl:w-auto z-10 relative"
                alt={image.alt ?? ''}
                priority
              />

              {/* Top */}
              <div className="w-32 lg:w-60 h-16 lg:h-32 bg-white absolute -top-12 lg:-top-10 z-20 -right-5" />
              {/* Bottom Left */}
              <div className="size-28 lg:size-40 bg-white absolute -bottom-5 lg:-bottom-10 z-20 -left-5 lg:-left-10" />
              {/* Bottom Right */}
              <div className="size-36 lg:size-64 bg-white absolute -bottom-16 lg:-bottom-32 -right-5 lg:-right-10" />
            </figure>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
