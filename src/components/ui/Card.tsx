import { cn } from '../../lib/utils'

export const Card = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='card'
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-4 rounded-[12px] border border-gray-100 shadow-sm overflow-hidden',
        className
      )}
      {...props}
    />
  )
}
