import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@vercel/remix';
import { Layout, LayoutContent } from '~/layouts/layout.tsx';
import { getSpacesPage } from '~/queries/spaces.ts';
import { PortableText } from '@portabletext/react';
import { Header } from '~/components/header.tsx';
import { SpaceList } from '~/components/space-list.tsx';
import { Container } from '~/components/container.tsx';
import { PostList } from '~/components/post-list';
import { AccordionList } from '~/components/accordion-list';

export const loader = async () => {
  const { page, spaces, posts } = await getSpacesPage();
  return json({ page, spaces, posts });
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

export default function Spaces() {
  const { page, spaces, posts } = useLoaderData<typeof loader>();

  console.log('page', page);

  return (
    <Layout>
      <Header colorScheme="light" />
      <LayoutContent className="bg-cararra-100">
        <div className="py-10 md:py-24 space-y-10 md:space-y-24">
          <Container>
            <div className="grid lg:grid-cols-2 gap-y-8 items-center">
              {page.header.title && (
                <h1 className="text-4xl md:text-6xl xl:text-8xl text-balance">
                  {page.header.title}
                </h1>
              )}

              <div className="p-10">
                <div className="space-y-4 p-5 relative border border-black text-xl text-balance before:content-['*'] before:block before:size-5 before:bg-black before:absolute before:-top-5 before:-left-5">
                  <PortableText value={page.header.description} />
                </div>
              </div>
            </div>
          </Container>

          <Container>
            <SpaceList spaces={spaces} />
          </Container>
        </div>

        {/* Accordion List */}
        {Boolean(page.accordionList?.items?.length) && (
          <section className="bg-black text-white py-8 lg:py-14">
            <Container className="py-9 border-t border-white">
              <div className="space-y-28 lg:space-y-40">
                <p className="font-serif text-2xl max-w-xl lg:text-5xl">
                  {page.accordionList.title}
                </p>

                <AccordionList items={page.accordionList.items} />
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
                  Showcase
                </p>
                <Link
                  to="/editorial/showcase"
                  className="text-sm underline underline-offset-2"
                >
                  View all
                </Link>
              </div>

              <PostList posts={posts} colorScheme="white" />
            </Container>
          </section>
        )}
      </LayoutContent>
    </Layout>
  );
}
