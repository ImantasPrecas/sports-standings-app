export const GridLayout = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <div className={`grid lg:grid-cols-6 gap-2 ${className}`}>{children}</div>
}
