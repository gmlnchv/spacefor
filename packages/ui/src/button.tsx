import * as Ariakit from '@ariakit/react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './utils.ts'

const buttonVariants = cva(
  'inline-flex min-w-32 border h-12 px-4 py-2 text-sm lg:text-base items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border border-current bg-transparent',
      },
    },
  },
)

export interface ButtonProps
  extends Ariakit.ButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, ...props }: ButtonProps) => (
  <Ariakit.Button
    className={cn(buttonVariants({ variant, className }))}
    {...props}
  />
)

export { Button }
