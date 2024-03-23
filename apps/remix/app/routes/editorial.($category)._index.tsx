import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Container } from '~/components/container';
import { Header } from '~/components/header';
import { Layout, LayoutContent } from '~/layouts/layout';
import { getEditorialPage } from '~/queries/posts';
import { MetaFunction } from '@vercel/remix';
import { Separator, buttonVariants, cn } from 'ui';
import { PostList } from '~/components/post-list.tsx';
import { NavLink } from '@remix-run/react';
import React from 'react';
import { getMetaTags } from '~/utils/meta-tags';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { category = null } = params;

  const { page, posts, categories } = await getEditorialPage(
    category as string
  );
  return json({ page, posts, categories });
};

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  return getMetaTags({
    title: data?.page.seo?.title,
    description: data?.page.seo?.description,
    image: data?.page.seo?.image?.asset.url,
    slug: location.pathname,
  });
};

const Link = (props: React.ComponentProps<typeof NavLink>) => (
  <NavLink
    {...props}
    end
    className={({ isActive }) =>
      cn(
        buttonVariants({
          variant: isActive ? 'solid' : 'default',
        })
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
