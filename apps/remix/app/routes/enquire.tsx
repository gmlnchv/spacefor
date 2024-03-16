import { Layout, LayoutContent } from '~/layouts/layout'
import { Header } from '~/components/header.tsx'
import { Container } from '~/components/container'
import React from 'react'
import { Separator } from 'ui'
import { json } from '@remix-run/node'
import { getContactPage } from '~/queries/contact.ts'
import { MetaFunction } from '@vercel/remix'
import { useLoaderData } from '@remix-run/react'
import { PortableText } from '@portabletext/react'
import { ContactForm } from '~/components/contact-form.tsx'

export const loader = async () => {
  const page = await getContactPage()
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

export default function Contact() {
  const { page } = useLoaderData<typeof loader>()

  console.log('page', page)

  return (
    <Layout>
      <Header colorScheme="light" />
      <LayoutContent className="bg-cararra-100 py-10 md:py-24">
        <Container>
          <div className="space-y-7 lg:space-y-9">
            <h1 className="text-5xl lg:text-6xl">{page.title}</h1>

            <Separator className="bg-black" />

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-2 text-balance max-w-[480px]">
                <PortableText
                  value={page.body}
                  components={{
                    marks: {
                      link: ({ children, value }) => {
                        return (
                          <a
                            href={value.href}
                            className="underline underline-offset-2"
                          >
                            {children}
                          </a>
                        )
                      },
                    },
                  }}
                />
              </div>

              <ContactForm />
            </div>
          </div>
        </Container>
      </LayoutContent>
    </Layout>
  )
}
