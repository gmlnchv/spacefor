import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@vercel/remix';
import { Layout, LayoutContent } from '~/layouts/layout.tsx';
import { getSpacePage, SpotProps } from '~/queries/spaces.ts';
import { Header } from '~/components/header.tsx';
import { Image } from '~/components/image.tsx';
import { PortableText } from '@portabletext/react';
import { Container } from '~/components/container.tsx';
import { SpaceIcon } from '~/components/space-icon';
import { SpecsIcon } from '~/components/specs-icon';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from 'ui';
import { SpaceAdditionalImages } from '~/components/space-additional-images';
import { AccordionList } from '~/components/accordion-list';
import { TestimonialList } from '~/components/testimonial-list';
import { BookingBanner } from '~/components/booking-banner';
import { getMetaTags } from '~/utils/meta-tags';
import { BookingForm } from '~/components/booking-form';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  const { space, testimonials } = await getSpacePage(slug as string);

  return json({ space, testimonials });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return getMetaTags({
    title: data?.space.seo?.title,
    description: data?.space.seo?.description,
    image: data?.space.seo?.image?.asset.url,
    slug: `/spaces/${data?.space.slug}`,
  });
};

const Spot = (spot: SpotProps) => (
  <div
    className="absolute grid place-items-center size-2 md:size-4"
    style={{
      top: `${spot.y}%`,
      left: `${spot.x}%`,
    }}
  >
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="absolute size-2 md:size-4 bg-white rounded-full cursor-pointer z-10"
          aria-label={spot.description}
        />
      </PopoverTrigger>
      <PopoverContent
        className="rounded-none p-5 w-[220px]"
        sideOffset={0}
        side="bottom"
        align="start"
      >
        <p>{spot.description}</p>

        <PopoverArrow asChild width={1} height={50}>
          <svg
            viewBox="0 0 1 50"
            xmlns="http://www.w3.org/2000/svg"
            className="relative top-px"
          >
            <path stroke="#fff" d="M.5 0v50" />
          </svg>
        </PopoverArrow>
      </PopoverContent>
    </Popover>

    <span className="absolute inline-flex h-full w-full bg-white opacity-75 animate-ping rounded-full" />
  </div>
);

export default function Space() {
  const { space, testimonials } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Header />
      <LayoutContent className="bg-black text-white">
        <section className="py-10 md:py-24 max-h-[875px]">
          <Container>
            <div className="flex max-sm:flex-wrap items-center gap-y-8 justify-between">
              <header className="space-y-12 lg:space-y-16 max-w-[380px] pr-6">
                <h1 className="text-3xl md:text-6xl">{space.title}</h1>

                <div className="space-y-4">
                  <PortableText value={space.detailDescription} />
                </div>

                <BookingForm />
              </header>

              {space.image && (
                <figure
                  key={space.image.asset._id}
                  className="grid justify-items-end"
                >
                  <Image
                    src={space.image.asset.url}
                    layout="constrained"
                    width={815}
                    height={510}
                    blurHash={space.image.asset.metadata.blurHash}
                    className="border border-white shrink"
                    alt={space.title}
                  />

                  <figcaption className="bg-white p-5 text-black leading-tight space-y-2.5 max-w-[260px] lg:max-w-[360px]">
                    <dl>
                      <dt className="sr-only">Address</dt>
                      <dd className="flex gap-x-5 items-center">
                        <SpaceIcon width={18} />
                        <span>{`${space.address}, ${space.city}`}</span>
                      </dd>
                    </dl>

                    {space.specs && (
                      <dl>
                        <dt className="sr-only">Specs</dt>
                        <dd className="flex gap-x-5 items-center">
                          <SpecsIcon width={18} />
                          <span>{space.specs}</span>
                        </dd>
                      </dl>
                    )}
                  </figcaption>
                </figure>
              )}
            </div>
          </Container>
        </section>

        {/* Plan */}
        {space.plan && (
          <section>
            <Container>
              <header className="space-y-12 lg:space-y-16 max-w-[380px]">
                <h2 className="text-3xl md:text-5xl">The Space</h2>

                {space.plan.description && <p>{space.plan.description}</p>}
              </header>

              {/* Hotspots */}
              <div className="grid justify-items-center mt-10 mb-20 lg:my-10">
                <figure className="relative">
                  <img
                    src={space.plan.image?.asset.url}
                    className=""
                    alt={space.title}
                  />

                  {space.plan.hotspots?.map((spot) => (
                    <Spot key={spot._key} {...spot} />
                  ))}
                </figure>
              </div>
            </Container>
          </section>
        )}

        {/* Additional images */}
        <Container className="pb-10 md:pb-24">
          <SpaceAdditionalImages images={space.images} />
        </Container>

        {/* Accordion List */}
        {space.accordionList && (
          <section className="bg-black text-white py-8 lg:py-14">
            <Container className="py-9 border-t border-white">
              <div className="space-y-28 lg:space-y-40">
                <p className="font-serif text-2xl max-w-xl lg:text-5xl">
                  {space.accordionList.title}
                </p>

                <AccordionList items={space.accordionList.items} />
              </div>
            </Container>
          </section>
        )}

        {/* Testimonials */}
        {Boolean(testimonials?.length) && (
          <TestimonialList testimonials={testimonials} />
        )}

        {/* Booking banner */}
        <BookingBanner />
      </LayoutContent>
    </Layout>
  );
}
