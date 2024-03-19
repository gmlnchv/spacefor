import { Layout, LayoutContent } from '~/layouts/layout';
import { Header } from '~/components/header.tsx';
import { Container } from '~/components/container';
import { Separator } from 'ui';
import { json } from '@remix-run/node';
import { getContactPage } from '~/queries/contact.ts';
import { MetaFunction } from '@vercel/remix';
import { useLoaderData } from '@remix-run/react';
import { PortableText } from '@portabletext/react';
import { ContactForm } from '~/components/contact-form.tsx';
import { AccordionList } from '~/components/accordion-list';

export const loader = async () => {
  const page = await getContactPage();
  return json({ page });
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

export default function Contact() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Header colorScheme="light" />
      <LayoutContent className="bg-cararra-100 pt-10 md:pt-24">
        <Container>
          <div className="space-y-7 lg:space-y-9 pb-7 lg:pb-9">
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
                        );
                      },
                    },
                  }}
                />
              </div>

              <ContactForm />
            </div>
          </div>
        </Container>

        {/* Accordion List */}
        {page.accordionList && (
          <section className="bg-black text-white py-8 lg:py-14">
            <Container className="py-9 border-t border-white">
              <div className="space-y-28 lg:space-y-40">
                <p className="font-serif text-2xl max-w-xl lg:text-5xl">
                  {page.accordionList.title}
                </p>

                <AccordionList items={page.accordionList.items} />
              </div>
            </Container>
          </section>
        )}
      </LayoutContent>
    </Layout>
  );
}
