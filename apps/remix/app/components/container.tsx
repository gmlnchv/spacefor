import * as React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container = (props: ContainerProps) => (
  <div className="px-5">
    <div className="mx-auto max-w-7xl" {...props} />
  </div>
)

export { Container }
