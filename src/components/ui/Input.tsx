import { cn } from '../../lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'placeholder:text-muted-foreground border-input flex w-full min-w-0 rounded-md border bg-background py-1 text-base shadow-xs outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      inputSize: {
        default: 'h-10 px-4',
        sm: 'h-8 px-3',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      inputSize: 'default',
    },
  }
)

export const Input = ({
  className,
  type,
  inputSize,

  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) => {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(inputVariants({ inputSize }), className)}
      {...props}
    />
  )
}
