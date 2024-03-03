import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@vercel/remix';
import { Layout, LayoutContent } from '~/layouts/layout.tsx';
import { getSpacesPage } from '~/queries/spaces.ts';
import { PortableText } from '@portabletext/react';
import { Header } from '~/components/header.tsx';
import { SpaceList } from '~/components/space-list.tsx';
import { Container } from '~/components/container.tsx';

export const loader = async () => {
  const { page, spaces } = await getSpacesPage();
  return json({ page, spaces });
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
  const { page, spaces } = useLoaderData<typeof loader>();

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
      </LayoutContent>
    </Layout>
  );
}
