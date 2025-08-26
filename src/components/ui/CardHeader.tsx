import { cn } from '../../lib/utils'

export const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('grid auto-rows-min items-start gap-1.5 px-6', className)}
      {...props}
    />
  )
}
