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

export const loader = async () => {
  const { page, retailers, events, posts } = await getHomePage();
  return json({ page, retailers, events, posts });
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
  const { page, retailers, events, posts } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Header />
      <LayoutContent className="bg-black text-white">
        <Hero {...page.hero} />

        {/* Retailers */}
        <RetailerList retailers={retailers} />

        {/* Events */}
        <EventList events={events} />

        {/* Images */}
        {Boolean(page.images?.length) && (
          <section className="bg-cararra-100 text-black py-8 lg:py-14">
            <Container className="py-9 border-y">
              <div className="space-y-9">
                <p className="font-serif text-2xl max-w-xl lg:text-5xl">
                  IRL, made easy
                </p>

                <HomeImageList images={page.images} />
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
        {Boolean(page.testimonials?.length) && (
          <TestimonialList testimonials={page.testimonials} />
        )}
      </LayoutContent>
    </Layout>
  );
}
