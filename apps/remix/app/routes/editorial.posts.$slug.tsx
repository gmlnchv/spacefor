import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Layout, LayoutContent } from '~/layouts/layout';
import { getPost } from '~/queries/posts';
import { Header } from '~/components/header.tsx';
import { Container } from '~/components/container.tsx';
import { format, parseISO } from 'date-fns';
import { Image } from '~/components/image.tsx';
import { PortableText } from '@portabletext/react';
import { MetaFunction } from '@vercel/remix';
import { getMetaTags } from '~/utils/meta-tags';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug = null } = params;

  const post = await getPost(slug as string);
  return json(post);
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return getMetaTags({
    title: data?.seo?.title,
    description: data?.seo?.description,
    image: data?.seo?.image?.asset.url,
    slug: `/editorial/posts/${data?.slug}`,
  });
};

export default function Post() {
  const post = useLoaderData<typeof loader>();
  return (
    <Layout>
      <Header colorScheme="light" />
      <LayoutContent className="bg-cararra-100 py-10">
        <Container>
          <div className="border-y border-black">
            <header className="border-b border-black py-7 space-y-5 lg:space-y-9 text-center lg:py-9">
              <p className="">{format(parseISO(post.publishedAt), 'd-M-yy')}</p>
              <h1 className="text-5xl lg:text-6xl text-balance max-w-2xl mx-auto">
                {post.title}
              </h1>
            </header>

            <div className="max-w-4xl text-balance mx-auto py-7 lg:py-10 space-y-7 lg:space-y-12">
              <p className="text-center text-lg font-serif leading-tight lg:text-2xl">
                {post.excerpt}
              </p>

              <figure className="space-y-3.5">
                <Image
                  src={post.image.asset.url}
                  width={500}
                  height={500}
                  blurHash={post.image.asset.metadata.blurHash}
                  alt={post.image.alt || post.image.caption || post.title}
                  className="mx-auto border-2 border-black"
                />

                {post.image.caption && (
                  <figcaption className="text-center text-sm lg:text-base">
                    {post.image.caption}
                  </figcaption>
                )}
              </figure>

              <div className="space-y-6">
                <PortableText
                  value={post.body}
                  components={{
                    types: {
                      image: ({ value }) => (
                        <Image
                          src={value.asset.url}
                          width={value.asset.metadata.dimensions.width}
                          height={value.asset.metadata.dimensions.height}
                          blurHash={value.asset.metadata.blurHash}
                          alt={value.alt || value.caption || ''}
                          className="mx-auto my-4 border-2 border-black"
                        />
                      ),
                    },
                    block: {
                      h3: ({ children }) => (
                        <h3 className="text-xl lg:text-2xl">{children}</h3>
                      ),
                    },
                    marks: {
                      link: ({ children, value }) => {
                        const rel = value.href.startsWith('/')
                          ? undefined
                          : 'noreferrer noopener';
                        return (
                          <a
                            rel={rel}
                            href={value.href}
                            className="underline underline-offset-2"
                          >
                            {children}
                          </a>
                        );
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </LayoutContent>
    </Layout>
  );
}
