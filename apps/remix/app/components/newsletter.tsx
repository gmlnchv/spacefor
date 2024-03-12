import { useFetcher } from '@remix-run/react'
import { Container } from './container'
import { Input } from 'ui/src'
import { Button } from 'ui'

export const Newsletter = () => {
  const form = useFetcher()
  return (
    <section className="py-8 lg:py-14 space-y-8 lg:space-y-14 bg-cararra-100 text-black">
      <Container>
        <p className="font-serif text-2xl max-w-xl lg:text-5xl">
          Stay in the loop
        </p>
      </Container>

      <Container>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <form.Form
            method="post"
            action="/subscribe"
            className="md:col-start-2 flex gap-4 items-center"
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <Input type="email" name="email" id="email" placeholder="Email" />
            <button
              type="submit"
              className="inline-flex border h-[46px] px-4 py-2 text-sm lg:text-base items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Subscribe
            </button>
          </form.Form>

          {/*  success*/}
          {form.data?.status === 201 && (
            <p className="md:col-start-2 text-black">{form.data.message}</p>
          )}

          {/*  error*/}
          {form.data?.status === 400 && (
            <p className="md:col-start-2 text-red-600">{form.data.message}</p>
          )}
        </div>
      </Container>
    </section>
  )
}
