import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './utils.ts';

const buttonVariants = cva(
  'inline-flex border min-w-32 border h-12 px-4 py-2 text-sm lg:text-base items-center justify-center focus-visible:ring-offset-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-black text-black hover:bg-black hover:text-white focus-visible:ring-black focus-visible:ring-offset-transparent',
        inverse:
          'border-white text-white hover:bg-white hover:text-black focus-visible:ring-white focus-visible:ring-offset-black',
      },
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
