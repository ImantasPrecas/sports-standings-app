import { Check, Plus, X } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { CardHeader } from './ui/CardHeader'
import { CardTitle } from './ui/CardTitle'
import { SectionWrapper } from './ui/SectionWrapper'
import { StandingsTable } from './ui/StandingsTable'
import tenisBallIcon from '../assets/tenisBall.svg'

const tableData = {
  tableHeader: [
    { title: 'Player', key: 'name' },
    { title: 'M', key: 'matches' },
    { title: 'W', key: 'won' },
    { title: 'L', key: 'lost' },
    { title: 'Pts', key: 'points' },
  ],
  standings: [
    {
      name: 'Djokovich',
      matches: 3,
      won: 2,
      lost: 0,
      points: 7,
      icons: {
        won: <Check height={20} color='green' />,
        lost: <X height={20} color='red' />,
      },
    },
    {
      name: 'Nadal',
      matches: 3,
      won: 2,
      lost: 1,
      points: 6,
      icons: {
        won: <Check height={20} color='green' />,
        lost: <X height={20} color='red' />,
      },
    },
    {
      name: 'Federer',
      matches: 3,
      won: 1,
      lost: 0,
      points: 5,
      icons: {
        won: <Check height={20} color='green' />,
        lost: <X height={20} color='red' />,
      },
    },
    {
      name: 'Murray',
      matches: 3,
      won: 1,
      lost: 1,
      points: 4,
      icons: {
        won: <Check height={20} color='green' />,
        lost: <X height={20} color='red' />,
      },
    },
  ],
}

export const WimbledonComponent = () => {
  return (
    <SectionWrapper className='theme-design-3'>
      <Card>
        <CardHeader className='bg-primary h-full'>
          <CardTitle className='flex align-center text-primary-foreground gap-4'>
            <img
              src={tenisBallIcon}
              alt='tenisball'
              className='h-6 my-auto inline-block filter brightness-0 invert'
            />
            <p> Wimbledon</p>
          </CardTitle>
        </CardHeader>
        <div className='flex flex-col lg:flex-row w-full justify-between gap-6'>
          <div className='flex-row lg:flex-col gap-2 mt-4'>
            {/* ADD TEAM AND RESULTS BUTTONS */}
            <div className='mx-4'>
              <div className='flex items-center justify-between lg:flex-col lg:gap-6'>
                <Button variant='primary' size='lg' className='w-auto gap-2'>
                  <Plus size={16} /> Add Player
                </Button>
                <Button variant='secondary' size='lg' className='w-auto gap-2'>
                  <Plus size={16} /> Add Score
                </Button>
              </div>
            </div>
          </div>
          {/* STANDINGS TABLE */}
          <div className='col-span-2 mx-4 mb-4 mt-4'>
            <StandingsTable tableData={tableData} />
          </div>
        </div>
      </Card>
    </SectionWrapper>
  )
}
