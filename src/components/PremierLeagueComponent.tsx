import UsePremierLeagueStore from '@/store/premierLeagueStore'

import { Card } from '@/components/ui/Card'
import { CardHeader } from '@/components/ui/CardHeader'
import { CardTitle } from '@/components/ui/CardTitle'
import { Input } from '@/components/ui/Input'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SelectEntity } from '@/components/ui/SelectEntity'
import { Button } from '@/components/ui/Button'
import { StandingsTable } from '@/components/ui/StandingsTable'
import { GridLayout } from './EurobasketComponent'
import { useNewEntity } from '@/hooks/useNewEtity'
import { useAddScores } from '@/hooks/useAddSores'

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

  const {
    p1: selectedTeamA,
    setP1: setSelectedTeamA,
    p2: selectedTeamB,
    setP2: setSelectedTeamB,
    score1: teamAScore,
    setScore1: setTeamAScore,
    score2: teamBScore,
    setScore2: setTeamBScore,
    scoreError,
    handleSubmitScore,
  } = useAddScores({ existingMatches, addMatch })

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
            <AddScoresForm
              teamsList={teamsList}
              selectedTeamA={selectedTeamA}
              setSelectedTeamA={setSelectedTeamA}
              selectedTeamB={selectedTeamB}
              setSelectedTeamB={setSelectedTeamB}
              teamAScore={teamAScore}
              setTeamAScore={setTeamAScore}
              teamBScore={teamBScore}
              setTeamBScore={setTeamBScore}
              handleSubmitScore={handleSubmitScore}
              scoreError={scoreError}
            />
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

interface AddScoresFormProps {
  teamsList: { id: string; name: string }[]
  selectedTeamA: string
  setSelectedTeamA: React.Dispatch<React.SetStateAction<string>>
  selectedTeamB: string
  setSelectedTeamB: React.Dispatch<React.SetStateAction<string>>
  teamAScore: string
  setTeamAScore: React.Dispatch<React.SetStateAction<string>>
  teamBScore: string
  setTeamBScore: React.Dispatch<React.SetStateAction<string>>
  handleSubmitScore: () => void
  scoreError: string
}

const AddScoresForm = ({
  teamsList,
  selectedTeamA,
  setSelectedTeamA,
  selectedTeamB,
  setSelectedTeamB,
  teamAScore,
  setTeamAScore,
  teamBScore,
  setTeamBScore,
  handleSubmitScore,
  scoreError,
}: AddScoresFormProps) => {
  return (
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
              options={teamsList}
              value={selectedTeamA}
              onSelect={setSelectedTeamA}
            />
          </div>

          {/* AWAY TEAM */}
          <div className='w-full'>
            <SelectEntity
              size='sm'
              placeholder='Away team'
              options={teamsList}
              value={selectedTeamB}
              onSelect={setSelectedTeamB}
            />
          </div>
        </div>

        {/* ENTER SCORE */}

        <div>
          {/* HOME TEAM */}
          <div className='flex gap-2'>
            <div className='w-full'>
              <Input
                id='prem-home-score'
                value={teamAScore}
                onChange={(e) => setTeamAScore(e.target.value)}
                placeholder='Home Score'
                disabled={!selectedTeamA}
                inputSize='sm'
                className='placeholder:text-sm'
              />
            </div>

            {/* AWAY TEAM */}
            <div className='w-full'>
              <Input
                id='prem-away-score'
                value={teamBScore}
                onChange={(e) => setTeamBScore(e.target.value)}
                placeholder='Away Score'
                disabled={!selectedTeamB}
                inputSize='sm'
                className='placeholder:text-sm'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <Button variant='secondary' size='sm' onClick={handleSubmitScore}>
          Add Score
        </Button>
      </div>
      {scoreError && <p className='text-xs text-red-500 mt-1'>{scoreError}</p>}
    </div>
  )
}
