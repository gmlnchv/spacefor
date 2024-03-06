import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Layout, LayoutContent } from '~/layouts/layout'
import { getPost } from '~/queries/posts'
import React from 'react'
import { Header } from '~/components/header.tsx'
import { Container } from '~/components/container.tsx'
import { format, parseISO } from 'date-fns'
import { Image } from '~/components/image.tsx'
import { Separator } from 'ui'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug = null } = params

  const post = await getPost(slug as string)
  return json(post)
}

export default function Post() {
  const post = useLoaderData<typeof loader>()
  console.log(post)
  return (
    <Layout>
      <Header colorScheme="light" />
      <LayoutContent className="bg-cararra-100 py-10">
        <Container>
          <header className="border-y border-black py-7 space-y-5 lg:space-y-9 text-center lg:py-9">
            <p className="">{format(parseISO(post.publishedAt), 'd-M-yy')}</p>
            <h1 className="text-5xl lg:text-6xl text-balance max-w-2xl mx-auto">
              {post.title}
            </h1>
          </header>

          <div className="max-w-4xl text-balance mx-auto pt-7 lg:pt-10 space-y-7 lg:space-y-12">
            <p className="text-center text-lg font-serif leading-tight lg:text-2xl">
              {post.excerpt}
            </p>

            <Image
              src={post.image.asset.url}
              width={500}
              height={500}
              blurHash={post.image.asset.metadata.blurHash}
              alt={post.title}
              className="mx-auto border-2 border-black"
            />

            <p>{post.body}</p>
          </div>

          <Separator />
        </Container>
      </LayoutContent>
    </Layout>
  )
}
