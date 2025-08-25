import { Card } from './ui/Card'
import { CardHeader } from './ui/CardHeader'
import { CardTitle } from './ui/CardTitle'
import { Input } from './ui/Input'
import { SectionWrapper } from './ui/SectionWrapper'

export const PremierLeagueComponent = () => {
  return (
    <SectionWrapper className='theme-design1'>
      <Card>
        <CardHeader className='bg-primary h-full'>
          <CardTitle className='text-background'>Premier League</CardTitle>
        </CardHeader>
        {/* Add team section */}
        <div className='mx-2'>
          <div className='rounded-md bg-gray-100 px-2 py-4'>
            <p className='text-xs mb-2 font-semibold'>Add Team</p>
            <div className='flex gap-2'>
              <Input
                className='h-6 text-sm placeholder:text-sm bg-background'
                placeholder='Team Name'
              />
              <button className='rounded-md bg-secondary px-3 text-background h-6 text-sm'>
                Add
              </button>
            </div>
          </div>
        </div>
      </Card>
    </SectionWrapper>
  )
}
