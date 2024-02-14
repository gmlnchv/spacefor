import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@vercel/remix';
import { Layout, LayoutContent } from '~/layouts/layout.tsx';
import { Header } from '~/components/header.tsx';
import { getHomePage } from '~/queries/home.ts';
import { RetailerList } from '~/components/retailer-list.tsx';
import Hero from '~/components/hero';
import { EventList } from '~/components/event-list';

export const loader = async () => {
  const { page, retailers, events } = await getHomePage();
  return json({ page, retailers, events });
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
  const { page, retailers, events } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Header />
      <LayoutContent className="bg-black text-white">
        <Hero {...page.hero} />

        {/* Retailers */}
        <RetailerList retailers={retailers} />

        {/* Events */}
        <EventList events={events} />
      </LayoutContent>
    </Layout>
  );
}
