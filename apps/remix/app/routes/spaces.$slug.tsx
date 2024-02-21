import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@vercel/remix';
import { Layout, LayoutContent } from '~/layouts/layout.tsx';
import { getSpacePage } from '~/queries/spaces.ts';
import { Header } from '~/components/header.tsx';
import { Image } from '~/components/image.tsx';
import { PortableText } from '@portabletext/react';
import { Container } from '~/components/container.tsx';
import { SpaceIcon } from '~/components/space-icon';
import { SpecsIcon } from '~/components/specs-icon';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  const space = await getSpacePage(slug as string);

  return json({ space });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.space.title },
    {
      property: 'og:title',
      content: data?.space.seo?.title ?? data?.space.title,
    },
    {
      name: 'description',
      content: data?.space.seo?.description ?? '',
    },
  ];
};

export default function Space() {
  const { space } = useLoaderData<typeof loader>();

  console.log(space);

  return (
    <Layout>
      <Header />
      <LayoutContent className="bg-black text-white">
        <section className="py-10 md:py-24 max-h-[875px]">
          <Container>
            <div className="flex max-sm:flex-wrap items-center gap-y-8 justify-between">
              <header className="space-y-6 lg:space-y-14 max-w-[380px]">
                <h1 className="text-3xl md:text-6xl">{space.title}</h1>

                <div className="space-y-4">
                  <PortableText value={space.detailDescription} />
                </div>
              </header>

              {space.image && (
                <figure className="grid justify-items-end">
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
      </LayoutContent>
    </Layout>
  );
}
