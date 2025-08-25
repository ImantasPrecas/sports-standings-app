import { cn } from '../../lib/utils'

export const CardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('leading-none font-medium my-4 font-family text-xl', className)}
      {...props}
    />
  )
}
