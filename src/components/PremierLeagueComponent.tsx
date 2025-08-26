import { Card } from '@/components/ui/Card'
import { CardHeader } from '@/components/ui/CardHeader'
import { CardTitle } from '@/components/ui/CardTitle'
import { Input } from '@/components/ui/Input'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SelectEntity } from '@/components/ui/SelectEntity'
import { Button } from './ui/Button'
import { StandingsTable } from './ui/StandingsTable'

const teams = [
  { name: 'Team 1', value: 'team1' },
  { name: 'Team 2', value: 'team2' },
  { name: 'Team 3', value: 'team3' },
]

const tableData = {
  tableHeader: [
    { title: 'Team', key: 'team' },
    { title: 'P', key: 'played' },
    { title: 'W', key: 'won' },
    { title: 'D', key: 'drawn' },
    { title: 'L', key: 'lost' },
    { title: 'Pts', key: 'points' },
  ],
  standings: [
    { name: 'Teaasdasdaddm 1', played: 3, won: 2, drawn: 1, lost: 0, points: 7 },
    { name: 'Team 2', played: 3, won: 2, drawn: 0, lost: 1, points: 6 },
    { name: 'Team 3', played: 3, won: 1, drawn: 2, lost: 0, points: 5 },
    { name: 'Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: 'Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: 'Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: 'Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: 'Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: 'Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: 'Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
  ],
}

export const PremierLeagueComponent = () => {
  return (
    <SectionWrapper className='theme-design1'>
      <Card>
        <CardHeader className='bg-primary h-full'>
          <CardTitle className='text-background'>Premier League</CardTitle>
        </CardHeader>
        <div className='grid lg:grid-cols-6 gap-2 md:flex-row'>
          {/* Add team section */}
          <div className='col-span-2 mx-2'>
            <div className='w-full rounded-md bg-card-muted px-2 py-4'>
              <p className='text-xs mb-2 font-semibold'>Add Team</p>
              <div className='flex gap-2'>
                <Input id='team-name' inputSize='sm' placeholder='Team Name' />
                <Button variant='secondary' size='sm' className='w-auto'>
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Add Score Section */}
          <div className='col-span-2 mx-2 mb-4 '>
            <div className='flex flex-col w-full gap-2 rounded-md  bg-card-muted px-2 py-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-xs font-semibold'>Add Score</p>

                {/* SELECT TEAM */}
                <div className='flex gap-2'>
                  {/* HOME TEAM */}
                  <div className='w-full'>
                    <SelectEntity size='sm' placeholder='Home team' options={teams} />
                  </div>

                  {/* AWAY TEAM */}
                  <div className='w-full'>
                    <SelectEntity size='sm' placeholder='Away team' options={teams} />
                  </div>
                </div>

                {/* ENTER SCORE */}

                <div>
                  {/* HOME TEAM */}
                  <div className='flex gap-2'>
                    <div className='w-full'>
                      <Input
                        inputSize='sm'
                        className='placeholder:text-sm'
                        placeholder='Home Score'
                      />
                    </div>

                    {/* AWAY TEAM */}
                    <div className='w-full'>
                      <Input
                        inputSize='sm'
                        className='placeholder:text-sm'
                        placeholder='Away Score'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <Button variant='secondary' size='sm'>
                  Add Score
                </Button>
              </div>
            </div>
          </div>

          {/* STANDINGS TABLE */}
          <div className='col-span-2 mx-2 mb-4'>
            <StandingsTable tableData={tableData} />
          </div>
        </div>
      </Card>
    </SectionWrapper>
  )
}
