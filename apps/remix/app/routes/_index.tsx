import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { MetaFunction } from '@vercel/remix'
import { getPageByType } from '~/queries/page.ts'
import { Layout } from '~/layouts/layout.tsx'
import { PageComponents } from '~/components/page-components.tsx'

export const loader = async () => {
  const page = await getPageByType('homePage')
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

export default function Index() {
  const { page } = useLoaderData<typeof loader>()

  return (
    <Layout>
      <PageComponents components={page.components} />
    </Layout>
  )
}
