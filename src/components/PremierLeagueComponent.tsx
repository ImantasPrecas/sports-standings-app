import UsePremierLeagueStore from '@/store/premierLeagueStore'

import { Card } from '@/components/ui/Card'
import { CardHeader } from '@/components/ui/CardHeader'
import { CardTitle } from '@/components/ui/CardTitle'
import { Input } from '@/components/ui/Input'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { StandingsTable } from '@/components/ui/StandingsTable'
import { useNewEntity } from '@/hooks/useNewEtity'
import { AddScoresForm } from './AddScoresForm'
import { GridLayout } from './ui/GridLayout'

export const PremierLeagueComponent = () => {
  const { getTeamsList, addTeam, getStandingsTable, addMatch, getMatches } =
    UsePremierLeagueStore()

  const standingsTable = getStandingsTable()
  const teamsList = getTeamsList()
  const existingMatches = Object.values(getMatches())

  const {
    newEntityName: newTeamName,
    setNewEntityName: setNewTeamName,
    newEntityError: newTeamError,
    handleAddNewEntity: handleAddNewTeam,
  } = useNewEntity({
    addEntity: addTeam,
    validationId: 'id',
    teamsList,
  })

  return (
    <SectionWrapper className='theme-design-1'>
      <Card>
        <CardHeader className='bg-primary h-full'>
          <CardTitle className='text-primary-foreground'>Premier League</CardTitle>
        </CardHeader>
        <GridLayout className='md:flex-row'>
          {/* Add team section */}
          <div className='col-span-2 mx-2'>
            <AddTeamForm
              setNewTeamName={setNewTeamName}
              handleAddNewTeam={handleAddNewTeam}
              newTeamName={newTeamName}
              newTeamError={newTeamError}
            />
          </div>
          {/* Add Score Section */}
          <div className='col-span-2 mx-2 mb-4 '>
            <div className='flex flex-col w-full gap-2 rounded-md  bg-card-muted px-2 py-4'>
              <AddScoresForm
                teamsList={teamsList}
                existingMatches={existingMatches}
                addMatch={addMatch}
                label='Add Match'
              />
            </div>
          </div>

          {/* STANDINGS TABLE */}
          <div className='col-span-2 mx-2 mb-4'>
            <StandingsTable tableData={standingsTable} />
          </div>
        </GridLayout>
      </Card>
    </SectionWrapper>
  )
}

const AddTeamForm = ({
  setNewTeamName,
  handleAddNewTeam,
  newTeamName,
  newTeamError,
}: {
  setNewTeamName: React.Dispatch<React.SetStateAction<string>>
  handleAddNewTeam: () => void
  newTeamName: string
  newTeamError: string
}) => {
  return (
    <div className='w-full rounded-md bg-card-muted px-2 py-4'>
      <p className='text-xs mb-2 font-semibold'>Add Team</p>
      <div className='flex gap-2'>
        <Input
          onChange={(e) => setNewTeamName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddNewTeam()
            }
          }}
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
          onClick={handleAddNewTeam}
        >
          Add
        </Button>
      </div>
      {newTeamError && <p className='text-xs text-red-500 mt-1'>{newTeamError}</p>}
    </div>
  )
}
