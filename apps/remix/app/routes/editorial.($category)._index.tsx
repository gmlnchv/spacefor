import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Container } from '~/components/container';
import { Header } from '~/components/header';
import { Layout, LayoutContent } from '~/layouts/layout';
import { getEditorialPage } from '~/queries/posts';
import { MetaFunction } from '@vercel/remix';
import { Separator, cn } from 'ui';
import { PostList } from '~/components/post-list.tsx';
import { NavLink } from '@remix-run/react';
import React from 'react';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { category = null } = params;

  const { page, posts, categories } = await getEditorialPage(
    category as string
  );
  return json({ page, posts, categories });
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

const Link = (props: React.ComponentProps<typeof NavLink>) => (
  <NavLink
    {...props}
    end
    className={({ isActive }) =>
      cn(
        'inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'h-[46px] px-4 py-2 text-sm lg:text-base border border-transparent',
        isActive
          ? 'bg-black text-white'
          : 'bg-transparent border-black text-black hover:bg-black hover:text-white'
      )
    }
  />
);

export default function Editorial() {
  const { page, posts, categories } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Header colorScheme="light" />
      <LayoutContent className="bg-cararra-100 py-10 md:py-24">
        <Container>
          <div className="space-y-7 lg:space-y-9">
            <h1 className="text-5xl lg:text-6xl">{page.title}</h1>

            <Separator className="bg-black" />

            {/* Categories */}
            <div className="flex gap-2 overflow-auto">
              <Link to={`/editorial`}>All</Link>

              {categories.map((category) => (
                <Link key={category.slug} to={`/editorial/${category.slug}`}>
                  {category.title}
                </Link>
              ))}
            </div>

            {/* Posts */}
            <PostList posts={posts} />
          </div>
        </Container>
      </LayoutContent>
    </Layout>
  );
}
