import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@vercel/remix';
import { Layout, LayoutContent } from '~/layouts/layout.tsx';
import { PageComponents } from '~/components/page-components.tsx';
import { Header } from '~/components/header.tsx';
import { getHomePage } from '~/queries/home.ts';
import { RetailerList } from '~/components/retailer-list.tsx';
import Hero from '~/components/hero';

export const loader = async () => {
  const { page, retailers } = await getHomePage();
  return json({ page, retailers });
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
  const { page, retailers } = useLoaderData<typeof loader>();

  console.log('page', page);
  console.log('retailers', retailers);

  return (
    <Layout>
      <Header />
      <LayoutContent className="bg-black text-white">
        <Hero {...page.hero} />

        {/* Retailers */}
        <RetailerList retailers={retailers} />
      </LayoutContent>
    </Layout>
  );
}
