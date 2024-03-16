import * as React from 'react';
import { cn } from 'ui/src';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container = ({ className, ...props }: ContainerProps) => (
  <div className="px-5">
    <div className={cn('mx-auto max-w-7xl', className)} {...props} />
  </div>
);

export { Container };
