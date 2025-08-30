import UsePremierLeagueStore from '@/store/premierLeagueStore'

import { Card } from '@/components/ui/Card'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { StandingsTable } from '@/components/ui/StandingsTable'
import { useNewEntity } from '@/hooks/useNewEtity'
import { AddScoresForm } from './AddScoresForm'
import { GridLayout } from './ui/GridLayout'
import { ScoreboardHeader } from './ui/ScoreboardHeader'
import { AddEntityForm } from './AddEntityForm'

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
        <ScoreboardHeader title='Premier League' />
        <GridLayout className='md:flex-row'>
          {/* Add team section */}
          <div className='col-span-2 mx-2'>
            <AddEntityForm
              setNewEntityName={setNewTeamName}
              handleAddNewEntity={handleAddNewTeam}
              newEntityName={newTeamName}
              newEntityError={newTeamError}
              title='Add Team'
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
