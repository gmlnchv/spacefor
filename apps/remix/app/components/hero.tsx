import { HeroProps } from '~/queries/page.ts';
import { Image } from '~/components/image.tsx';
import { Container } from '~/components/container.tsx';

const Hero = ({ title, description, image }: HeroProps) => {
  return (
    <section className="py-10 md:py-24 max-h-[875px]">
      <Container>
        <div className="flex max-sm:flex-wrap items-center gap-6 justify-between">
          <header className="space-y-6 lg:space-y-14 text-balance md:w-1/2 xl:w-auto max-w-[660px]">
            <h1 className="text-4xl md:text-6xl xl:text-8xl text-balance">
              {title}
            </h1>
            <p className="text-balance">{description}</p>
          </header>

          {image && (
            <Image
              src={image.asset.url}
              layout="constrained"
              width={600}
              height={490}
              blurHash={image.asset.metadata.blurHash}
              className="border border-white md:w-1/2 xl:w-auto"
              alt={image.alt ?? ''}
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
