import { cn } from '@/lib/utils'

export const Table = ({ className, ...props }: React.ComponentProps<'table'>) => {
  return (
    <div className='w-full overflow-auto'>
      <table className={cn(`w-full text-sm`, className)} {...props} />
    </div>
  )
}

export const TableHeader = ({ className, ...props }: React.ComponentProps<'thead'>) => {
  return <thead className={cn('bg-muted', className)} {...props} />
}

export const TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => {
  return <tbody className={className} {...props} />
}

export const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => {
  return (
    <tr
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className
      )}
      {...props}
    />
  )
}

export const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => {
  return (
    <th
      data-slot='table-head'
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-bold whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
}

export const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => {
  return (
    <td
      data-slot='table-cell'
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
}
