import * as React from 'react';

import { cn } from './utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-none border-b-2 border-black bg-transparent px-2 py-1 text-base transition-colors placeholder:text-black/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
