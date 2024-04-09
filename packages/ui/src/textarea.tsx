import * as React from 'react';

import { cn } from './utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[60px] rounded-none w-full border-b-2 border-black bg-transparent p-2 text-base placeholder:text-black/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
