import { CardHeader } from './CardHeader'
import { CardTitle } from './CardTitle'

export const ScoreboardHeader = ({ title, icon }: { title: string; icon?: string }) => {
  return (
    <CardHeader className='bg-primary h-full'>
      <CardTitle className='flex align-center text-primary-foreground gap-4'>
        {icon && (
          <img
            src={icon}
            alt='Basketball'
            className='h-6 my-auto inline-block filter brightness-0 invert'
          />
        )}
        <p>{title}</p>
      </CardTitle>
    </CardHeader>
  )
}
