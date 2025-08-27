import { Plus } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { CardHeader } from './ui/CardHeader'
import { CardTitle } from './ui/CardTitle'
import { SectionWrapper } from './ui/SectionWrapper'
import { Input } from './ui/Input'
import { SelectEntity } from './ui/SelectEntity'
import { StandingsTable } from './ui/StandingsTable'

// *
//  For the country selection and flag mapping use
//  react-select-country-list + react-select + react-country-flag
//  https://www.npmjs.com/package/react-select-country-list
//  https://www.npmjs.com/package/react-country-flag
// *

const teams = [
  { name: 'Team 1', value: 'team1' },
  { name: 'Team 2', value: 'team2' },
  { name: 'Team 3', value: 'team3' },
]

const playedMatches = [
  { homeTeam: '🇱🇹 Team 1', awayTeam: '🇪🇪 Team 2', homeScore: 89, awayScore: 76 },
  { homeTeam: '🇫🇷 Team 3', awayTeam: '🇩🇪 Team 1', homeScore: 95, awayScore: 89 },
  { homeTeam: '🇪🇪 Team 2', awayTeam: '🇫🇷 Team 3', homeScore: 78, awayScore: 88 },
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
    { name: '🇱🇹 Team 1', played: 3, won: 2, drawn: 1, lost: 0, points: 7 },
    { name: '🇱🇹 Team 2', played: 3, won: 2, drawn: 0, lost: 1, points: 6 },
    { name: '🇫🇷 Team 3', played: 3, won: 1, drawn: 2, lost: 0, points: 5 },
    { name: '🇩🇪 Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: '🇪🇪 Team 5', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: '🇪🇪 Team 6', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: '🇪🇪 Team 7', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: '🇪🇪 Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: '🇪🇪 Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { name: '🇪🇪 Team 4', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
  ],
}

export const EurobasketComponent = () => {
  return (
    <SectionWrapper className='theme-design-2'>
      <Card className='bg-secondary'>
        {/* Header */}
        <CardHeader className='bg-secondary h-full'>
          <CardTitle className='flex align-center text-primary gap-4'>
            <img
              src='/src/assets/basketball-ball.svg'
              alt='Basketball'
              className='h-6 my-auto inline-block filter brightness-0 invert'
            />
            <p>EUROBASKET</p>
          </CardTitle>
        </CardHeader>
        <div className='grid lg:grid-cols-6 gap-2 bg-secondary'>
          {/* ADD Buttons */}
          <div className='col-span-2 mx-2'>
            <div className='w-full rounded-md px-2'>
              <div className='flex justify-between gap-2'>
                <Button variant='secondary' size='sm' className='w-auto'>
                  <Plus size={16} /> Add Team
                </Button>
                <Button variant='secondary' size='sm' className='w-auto'>
                  <Plus size={16} /> Add Score
                </Button>
              </div>
            </div>
          </div>
          {/* HIDDEN ADD TEAM INPUTS */}
          <div className='col-span-2 mx-6 hidden'>
            <div
              className='w-full rounded-md 
             px-2 py-4'
            >
              <div className='flex gap-2'>
                <Input id='team-name' inputSize='sm' placeholder='Team Name' />
                <Button variant='secondary' size='sm' className='w-auto'>
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* HIDDEN ADD SCORE INPUTS */}
          <div className='col-span-2 mx-6 mb-4 hidden'>
            <div className='flex flex-col w-full gap-2 rounded-md  bg-secondary px-2 py-4'>
              <div className='flex flex-col gap-2'>
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
          {/* PLAYED MATCHES */}
          <div className='col-span-2 mx-6 mb-4 mt-4 lg:mt-0'>
            <div className='flex flex-col text-primary'>
              {/* Map through played matches data */}
              <ul className='flex flex-col'>
                {playedMatches.map((match, index, array) => (
                  <div key={index} className='space-y-2'>
                    <li className='flex justify-between bg-secondary rounded-md'>
                      <p className='flex gap-2 text-sm'>
                        <span>{match.homeTeam}</span> vs <span>{match.awayTeam}</span>
                      </p>
                      <p className='text-sm'>
                        {match.homeScore} - {match.awayScore}
                      </p>
                    </li>
                    {index < array.length - 1 && (
                      <div className='h-[0.5px] bg-primary-foreground dark:bg-gray-700 mb-4 mx-2' />
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
          {/* SCORE TABLE */}
          <div className='col-span-2 mx-6 mb-4 mt-4 lg:mt-0 pb-10'>
            <StandingsTable tableData={tableData} rowLine={false} />
          </div>
        </div>
      </Card>
    </SectionWrapper>
  )
}
