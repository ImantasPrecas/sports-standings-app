import useWimbledonStore from '@/store/wimbledonStore'
import { Plus } from 'lucide-react'

import tenisBallIcon from '../assets/tenisBall.svg'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CardHeader } from '@/components/ui/CardHeader'
import { CardTitle } from '@/components/ui/CardTitle'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { StandingsTable } from '@/components/ui/StandingsTable'
import { Input } from '@/components/ui/Input'
import { useNewEntity } from '@/hooks/useNewEtity'
import { useAddScores } from '@/hooks/useAddSores'
import { GridLayout } from './ui/GridLayout'
import { AddScoresForm } from './AddScoresForm'
import { useState } from 'react'

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
  } = useNewEntity({
    addEntity: addPlayer,
    validationId: 'name',
    teamsList,
  })

  const { resetInputs } = useAddScores({ existingMatches, addMatch })

  return (
    <SectionWrapper className='theme-design-3'>
      <Card>
        <WimbledonHeader />
        <GridLayout>
          {/* ADD PLAYERS AND RESULTS BUTTONS */}
          <div className='col-span-2 lg:col-span-3 xl:col-span-2 mx-4 mb-4'>
            <div className='w-full rounded-md px-2'>
              <div className='flex lg:flex-col justify-between lg:gap-6'>
                {/* ADD PLAYER BUTTON */}
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
                  <div className='flex flex-col  w-full'>
                    <div className='flex  gap-2 w-full'>
                      <Input
                        id='wimbledon-player'
                        value={newPlayerName}
                        placeholder='Add Player'
                        className='bg-muted'
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddPlayer()
                          }
                        }}
                      />
                      <Button
                        variant='primary'
                        size='lg'
                        className='w-auto'
                        onClick={handleAddPlayer}
                      >
                        Add
                      </Button>
                      <Button
                        variant='primary'
                        size='lg'
                        className='w-auto'
                        onClick={() => {
                          setIsAddingPlayer(false)
                          resetInputs()
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                    {error && <div className='text-red-800 text-sm'>{error}</div>}
                  </div>
                )}

                {/* ADD SCORE BUTTON */}
                <Button
                  variant='secondary'
                  size='lg'
                  className='w-auto gap-2'
                  hidden={isAddingPlayer || isAddingScores}
                  onClick={() => setIsAddingScores(true)}
                >
                  <Plus size={16} /> Add Score
                </Button>
                {/* ADD SCORE INPUTS */}
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

const WimbledonHeader = () => {
  return (
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
  )
}
