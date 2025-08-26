import { cn } from '../../lib/utils'

export const SectionWrapper = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <section className={cn('mx-4 my-8 space-y-2.5', className)}>{children}</section>
}
