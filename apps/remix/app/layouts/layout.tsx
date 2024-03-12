import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Footer } from '~/components/footer.tsx'
import { cn } from 'ui'
import { Newsletter } from '~/components/newsletter.tsx'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
      <Newsletter />
      <Footer />
    </div>
  )
}

interface LayoutContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const LayoutContent = ({ children, className }: LayoutContentProps) => {
  return <main className={cn('flex-1', className)}>{children}</main>
}

export { Layout, LayoutContent }
