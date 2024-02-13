import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { MetaFunction } from '@vercel/remix'
import { Layout, LayoutContent } from '~/layouts/layout.tsx'
import { getSpacePage } from '~/queries/spaces.ts'
import { Header } from '~/components/header.tsx'
import { Image } from '~/components/image.tsx'
import { PortableText } from '@portabletext/react'
import { Container } from '~/components/container.tsx'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params

  console.log(slug)
  const space = await getSpacePage(slug as string)

  return json({ space })
}

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
  ]
}

export default function Space() {
  const { space } = useLoaderData<typeof loader>()

  console.log(space)

  return (
    <Layout>
      <Header />
      <LayoutContent className="bg-black text-white">
        <section className="py-10 md:py-24 max-h-[875px]">
          <Container>
            <div className="flex max-sm:flex-wrap items-center gap-6 justify-between">
              <header className="space-y-6 lg:space-y-14 text-balance max-w-[360px]">
                <h1 className="text-3xl lg:text-6xl text-balance">
                  {space.title}
                </h1>

                <div className="space-y-4">
                  <PortableText value={space.detailDescription} />
                </div>
              </header>

              {space.image && (
                <figure>
                  <Image
                    src={space.image.asset.url}
                    layout="constrained"
                    width={820}
                    height={510}
                    blurHash={space.image.asset.metadata.blurHash}
                    className="border border-white shrink"
                    alt={space.title}
                  />
                </figure>
              )}
            </div>
          </Container>
        </section>
      </LayoutContent>
    </Layout>
  )
}