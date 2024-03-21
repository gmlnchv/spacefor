import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@vercel/remix';
import { Layout, LayoutContent } from '~/layouts/layout.tsx';
import { Header } from '~/components/header.tsx';
import { getHomePage } from '~/queries/home.ts';
import { RetailerList } from '~/components/retailer-list.tsx';
import Hero from '~/components/hero';
import { EventList } from '~/components/event-list';
import { TestimonialList } from '~/components/testimonial-list';
import { PostList } from '~/components/post-list.tsx';
import { Container } from '~/components/container.tsx';
import { HomeImageList } from '~/components/home-image-list';
import { cn } from 'ui/src';
import { buttonVariants } from 'ui';

export const loader = async () => {
  const { page, retailers, events, posts, testimonials } = await getHomePage();
  return json({ page, retailers, events, posts, testimonials });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.page.title },
    {
      property: 'og:title',
      content: data?.page.seo?.title ?? data?.page.title,
    },
    {
      name: 'description',
      content: data?.page.seo?.description ?? '',
    },
  ];
};

export default function Index() {
  const { page, retailers, events, posts, testimonials } =
    useLoaderData<typeof loader>();

  return (
    <Layout>
      <Header />
      <LayoutContent className="bg-black text-white">
        {page.hero && <Hero {...page.hero} />}

        {/* Retailers */}
        {Boolean(retailers?.length) && <RetailerList retailers={retailers} />}

        {/* Events */}
        {Boolean(events?.length) && (
          <section className="space-y-9 py-10 md:py-24">
            <Container>
              <h3 className="text-2xl lg:text-5xl">What&apos;s on</h3>
            </Container>

            <EventList events={events} />
          </section>
        )}

        {/* Images */}
        {Boolean(page.images?.length) && (
          <section className="bg-cararra-100 text-black py-8 lg:py-14">
            <Container className="py-9 border-y">
              <div className="space-y-9 grid">
                <h3 className="text-2xl lg:text-5xl">IRL, made easy</h3>

                <HomeImageList images={page.images} />

                <Link
                  to="/enquire"
                  className={cn(buttonVariants(), 'justify-self-center')}
                >
                  Enquire
                </Link>
              </div>
            </Container>
          </section>
        )}

        {/* Posts */}
        {Boolean(posts?.length) && (
          <section className="bg-white text-black py-8 lg:py-14">
            <Container>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between py-9 border-t border-black">
                <p className="font-serif text-2xl lg:text-3xl text-balance">
                  Meet the founders behind your favourite brands
                </p>
                <Link
                  to="/editorial/meet-the-founder"
                  className="text-sm underline underline-offset-2"
                >
                  View all
                </Link>
              </div>

              <PostList posts={posts} colorScheme="white" />
            </Container>
          </section>
        )}

        {/* Testimonials */}
        {Boolean(testimonials?.length) && (
          <TestimonialList testimonials={testimonials} />
        )}
      </LayoutContent>
    </Layout>
  );
}
