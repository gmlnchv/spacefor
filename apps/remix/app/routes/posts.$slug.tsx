import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { MetaFunction } from '@vercel/remix'
import { getPost } from '~/queries/posts.ts'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params
  const post = await getPost(slug as string)

  return json({ post })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.post.title },
    {
      property: 'og:title',
      content: data?.post.seo.title ?? data?.post.title,
    },
    {
      name: 'description',
      content: data?.post.seo.description ?? '',
    },
  ]
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  )
}
