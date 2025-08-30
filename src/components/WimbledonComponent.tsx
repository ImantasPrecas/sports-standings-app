import useWimbledonStore from '@/store/wimbledonStore'
import { Plus } from 'lucide-react'

import tenisBallIcon from '../assets/tenisBall.svg'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { StandingsTable } from '@/components/ui/StandingsTable'
import { useNewEntity } from '@/hooks/useNewEtity'
import { GridLayout } from './ui/GridLayout'
import { AddScoresForm } from './AddScoresForm'
import { useState } from 'react'
import { ScoreboardHeader } from './ui/ScoreboardHeader'
import { AddEntityForm } from './AddEntityForm'

export const WimbledonComponent = () => {
  const { getPlayersList, addPlayer, getStandingsTable, addMatch, getMatches } =
    useWimbledonStore()
  const [isAddingScores, setIsAddingScores] = useState(false)
  const teamsList = getPlayersList()
  const standingsTable = getStandingsTable()
  const existingMatches = Object.values(getMatches())

  const {
    newEntityName: newPlayerName,
    setNewEntityName: setNewPlayerName,
    newEntityError: error,
    isAddingNewEntity: isAddingPlayer,
    setIsAddingNewEntity: setIsAddingPlayer,
    handleAddNewEntity: handleAddPlayer,
    resetForm: resetPlayerForm,
  } = useNewEntity({
    addEntity: addPlayer,
    validationId: 'name',
    teamsList,
  })

  return (
    <SectionWrapper className='theme-design-3'>
      <Card>
        <ScoreboardHeader title='Wimbledon' icon={tenisBallIcon} />
        <GridLayout>
          {/* ADD PLAYERS AND RESULTS BUTTONS */}
          <div className='col-span-2 lg:col-span-3 xl:col-span-2 mx-4 my-4'>
            <div className='w-full rounded-md px-2'>
              <div className='flex lg:flex-col justify-between lg:gap-6'>
                {/* SHOW ADD PLAYER INPUT BUTTON */}
                <Button
                  variant='primary'
                  size='lg'
                  className='w-auto gap-2'
                  onClick={() => setIsAddingPlayer(true)}
                  hidden={isAddingPlayer || isAddingScores}
                >
                  <Plus size={16} /> Add Player
                </Button>
                {/* ADD PLAYER INPUT */}
                {isAddingPlayer && (
                  <AddEntityForm
                    title='Add Player'
                    newEntityName={newPlayerName}
                    setNewEntityName={setNewPlayerName}
                    handleAddNewEntity={handleAddPlayer}
                    onCancel={() => {
                      setIsAddingPlayer(false)
                      resetPlayerForm()
                    }}
                    newEntityError={error}
                    cancelButton={true}
                    size='lg'
                  />
                )}

                {/* SHOW ADD SCORE FORM BUTTON */}
                <Button
                  variant='secondary'
                  size='lg'
                  className='w-auto gap-2'
                  hidden={isAddingPlayer || isAddingScores}
                  onClick={() => setIsAddingScores(true)}
                >
                  <Plus size={16} /> Add Score
                </Button>
                {/* ADD SCORE FORM */}
                {isAddingScores && (
                  <div
                    className={`col-span-1 mb-4 w-full ${
                      isAddingScores ? 'block' : 'hidden'
                    }`}
                  >
                    <div className='flex flex-col w-full gap-2 rounded-md  bg-primary px-2 py-4'>
                      <AddScoresForm
                        teamsList={teamsList}
                        existingMatches={existingMatches}
                        addMatch={addMatch}
                        cancelButton={true}
                        setIsAddingScores={setIsAddingScores}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* STANDINGS TABLE */}
          <div className='col-span-2 lg:col-start-5 mx-4 mb-4 mt-4'>
            <StandingsTable tableData={standingsTable} />
          </div>
        </GridLayout>
      </Card>
    </SectionWrapper>
  )
}
