import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Header } from '~/components/header.tsx'
import { Footer } from '~/components/footer.tsx'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container">{children}</main>
      <Footer />
    </div>
  )
}

export { Layout }
