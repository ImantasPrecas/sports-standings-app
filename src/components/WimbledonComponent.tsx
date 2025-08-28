// import { Check, Plus, X } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { CardHeader } from './ui/CardHeader'
import { CardTitle } from './ui/CardTitle'
import { SectionWrapper } from './ui/SectionWrapper'
import { StandingsTable } from './ui/StandingsTable'
import tenisBallIcon from '../assets/tenisBall.svg'
import useWimbledonStore from '@/store/wimbledonStore'
import { useState } from 'react'
import { Input } from './ui/Input'
import { SelectEntity } from './ui/SelectEntity'
import { Plus } from 'lucide-react'

export const WimbledonComponent = () => {
  const { getPlayersList, addPlayer, getStandingsTable, addMatch, getMatches } =
    useWimbledonStore()
  const [newPlayerName, setNewPlayerName] = useState('')
  const [isAddingPlayer, setIsAddingPlayer] = useState(false)
  const [isAddingScores, setIsAddingScores] = useState(false)
  const [selectedPlayerA, setSelectedPlayerA] = useState('')
  const [selectedPlayerB, setSelectedPlayerB] = useState('')
  const [playerAScore, setPlayerAScore] = useState('')
  const [playerBScore, setPlayerBScore] = useState('')
  const [error, setError] = useState('')

  const teamsList = getPlayersList()
  const standingsTable = getStandingsTable()

  const handleSubmitScore = () => {
    if (
      validateInput(playerAScore) &&
      validateInput(playerBScore) &&
      selectedPlayerA &&
      selectedPlayerB
    ) {
      if (checkForDuplication(selectedPlayerA, selectedPlayerB)) {
        setError('Players already played against each other')
        return
      }
      addMatch(
        selectedPlayerA,
        selectedPlayerB,
        Number(playerAScore),
        Number(playerBScore)
      )
      setIsAddingScores(false)
      resetInputs()
    } else {
      setError('Please enter valid scores and select both players.')
    }
  }

  const checkForDuplication = (playerA: string, playerB: string) => {
    const existingMatch = Object.values(getMatches()).find(
      (match) =>
        (match.playerA === playerA && match.playerB === playerB) ||
        (match.playerA === playerB && match.playerB === playerA)
    )
    return !!existingMatch
  }

  const validateInput = (value: string) => {
    const regex = /^[0-9]+$/
    return regex.test(value)
  }

  const resetInputs = () => {
    setNewPlayerName('')
    setSelectedPlayerA('')
    setSelectedPlayerB('')
    setPlayerAScore('')
    setPlayerBScore('')
    setError('')
  }
  return (
    <SectionWrapper className='theme-design-3'>
      <Card>
        <WimbledonHeader />
        <div className='flex flex-col lg:flex-row w-full justify-between gap-6'>
          <div className='flex-row lg:flex-col gap-2 mt-4'>
            {/* ADD PLAYERS AND RESULTS BUTTONS */}
            <div className='mx-4'>
              <div className='flex items-center justify-between lg:flex-col lg:gap-6'>
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
                  <div className='flex gap-2 w-full'>
                    <Input
                      id='wimbledon-player'
                      value={newPlayerName}
                      placeholder='Add Player'
                      onChange={(e) => setNewPlayerName(e.target.value)}
                    />
                    <Button
                      variant='primary'
                      size='lg'
                      className='w-auto'
                      onClick={() => {
                        addPlayer(newPlayerName)
                      }}
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
                    {error && <div className='text-red-500'>{error}</div>}
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
                      <div className='flex flex-col gap-2'>
                        {/* SELECT TEAM */}
                        <div className='flex gap-2'>
                          {/* HOME TEAM */}
                          <div className='w-full'>
                            <SelectEntity
                              size='sm'
                              placeholder='Home team'
                              options={teamsList}
                              value={selectedPlayerA}
                              onSelect={setSelectedPlayerA}
                            />
                          </div>
                          {/* AWAY TEAM */}
                          <div className='w-full'>
                            <SelectEntity
                              size='sm'
                              placeholder='Away team'
                              options={teamsList}
                              value={selectedPlayerB}
                              onSelect={setSelectedPlayerB}
                            />
                          </div>
                        </div>
                        {/* ENTER SCORE */}
                        <div>
                          {/* HOME TEAM */}
                          <div className='flex gap-2'>
                            <div className='w-full'>
                              <Input
                                id='euro-home-score'
                                value={playerAScore}
                                onChange={(e) => setPlayerAScore(e.target.value)}
                                disabled={!selectedPlayerA}
                                inputSize='sm'
                                className='placeholder:text-sm'
                                placeholder='Home Score'
                              />
                            </div>

                            {/* AWAY TEAM */}
                            <div className='w-full'>
                              <Input
                                id='euro-away-score'
                                value={playerBScore}
                                onChange={(e) => setPlayerBScore(e.target.value)}
                                disabled={!selectedPlayerB}
                                inputSize='sm'
                                className='placeholder:text-sm'
                                placeholder='Away Score'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ADD SCORE BUTTONS */}
                      <div className='flex flex-col w-full gap-2'>
                        <Button variant='secondary' size='sm' onClick={handleSubmitScore}>
                          Add Score
                        </Button>
                        <Button
                          variant='primary'
                          size='sm'
                          className='border hover:bg-secondary/10'
                          onClick={() => {
                            setIsAddingScores(false)
                            resetInputs()
                          }}
                        >
                          Cancel
                        </Button>
                        {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* STANDINGS TABLE */}
          <div className='col-span-2 mx-4 mb-4 mt-4'>
            <StandingsTable tableData={standingsTable} />
          </div>
        </div>
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
