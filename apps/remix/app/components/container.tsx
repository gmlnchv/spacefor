import * as React from 'react'

const Container = ({ children }: React.PropsWithChildren) => (
  <div className="px-4">
    <div className="mx-auto max-w-7xl">{children}</div>
  </div>
)

export { Container }