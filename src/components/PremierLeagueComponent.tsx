import { Card } from '@/components/ui/Card'
import { CardHeader } from '@/components/ui/CardHeader'
import { CardTitle } from '@/components/ui/CardTitle'
import { Input } from '@/components/ui/Input'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SelectEntity } from '@/components/ui/SelectEntity'
import { Button } from './ui/Button'
import { StandingsTable } from './ui/StandingsTable'
import useAppStore from '@/store/appStore'
import { useState } from 'react'

export const PremierLeagueComponent = () => {
  const { getTeamsList, addTeam, getStandingsTable } = useAppStore()
  const [newTeamName, setNewTeamName] = useState('')

  const standingsTable = getStandingsTable()
  const teamsArray = getTeamsList()

  const handleSubmitNewTeam = () => {
    addTeam(newTeamName)
    setNewTeamName('')
  }

  return (
    <SectionWrapper className='theme-design-1'>
      <Card>
        <CardHeader className='bg-primary h-full'>
          <CardTitle className='text-primary-foreground'>Premier League</CardTitle>
        </CardHeader>
        <div className='grid lg:grid-cols-6 gap-2 md:flex-row'>
          {/* Add team section */}
          <div className='col-span-2 mx-2'>
            <div className='w-full rounded-md bg-card-muted px-2 py-4'>
              <p className='text-xs mb-2 font-semibold'>Add Team</p>
              <div className='flex gap-2'>
                <Input
                  onChange={(e) => setNewTeamName(e.target.value)}
                  value={newTeamName}
                  id='team-name'
                  inputSize='sm'
                  placeholder='Team Name'
                />
                <Button
                  type='submit'
                  variant='secondary'
                  size='sm'
                  className='w-auto'
                  onClick={handleSubmitNewTeam}
                >
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
                    <SelectEntity
                      size='sm'
                      placeholder='Home team'
                      options={teamsArray}
                    />
                  </div>

                  {/* AWAY TEAM */}
                  <div className='w-full'>
                    <SelectEntity
                      size='sm'
                      placeholder='Away team'
                      options={teamsArray}
                    />
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
            <StandingsTable tableData={standingsTable} />
          </div>
        </div>
      </Card>
    </SectionWrapper>
  )
}
