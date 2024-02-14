import * as Ariakit from '@ariakit/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './utils.ts';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      colorScheme: {
        dark: 'bg-black text-white',
        light: 'bg-transparent text-black',
      },
      variant: {
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    compoundVariants: [
      {
        colorScheme: 'light',
        variant: 'link',
        class: 'text-white',
      },
    ],
    defaultVariants: {
      colorScheme: 'light',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends Ariakit.ButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button = ({
  className,
  colorScheme,
  variant,
  size,
  ...props
}: ButtonProps) => (
  <Ariakit.Button
    className={cn(buttonVariants({ colorScheme, variant, size, className }))}
    {...props}
  />
);

export { Button };
