import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { MetaFunction } from '@vercel/remix'
import { Layout, LayoutContent } from '~/layouts/layout.tsx'
import { getSpacesPage } from '~/queries/spaces.ts'
import { PortableText } from '@portabletext/react'
import { Header } from '~/components/header.tsx'

export const loader = async () => {
  const page = await getSpacesPage()
  return json({ page })
}

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
  ]
}

export default function Spaces() {
  const { page } = useLoaderData<typeof loader>()

  console.log(page)

  return (
    <Layout>
      <Header colorScheme="light" />
      <LayoutContent>
        <div className="bg-cararra-100">
          <div className="container py-10 md:py-20 lg:py-40">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              {page.header.title && (
                <h1 className="text-4xl lg:text-8xl">{page.header.title}</h1>
              )}

              <div className="space-y-4">
                <PortableText value={page.header.description} />
              </div>
            </div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  )
}
