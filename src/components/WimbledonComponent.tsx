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
import { checkForDuplication, validateNumericInput } from '@/lib/utils'

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
  const existingMatches = Object.values(getMatches())

  const handleSubmitScore = () => {
    if (
      validateNumericInput(playerAScore) &&
      validateNumericInput(playerBScore) &&
      selectedPlayerA &&
      selectedPlayerB
    ) {
      if (checkForDuplication(selectedPlayerA, selectedPlayerB, existingMatches)) {
        setError('Players already played against each other')
        return
      }
      if (selectedPlayerA === selectedPlayerB) {
        setError('Players must be different')
        return
      }
      if (teamsList.find((p) => p.name === newPlayerName.trim())) {
        setError('Player already exists')
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

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      if (teamsList.find((p) => p.name === newPlayerName.trim())) {
        setError('Player already exists')
        return
      }
      addPlayer(newPlayerName.trim())
      setIsAddingPlayer(false)
      resetInputs()
    }
  }

  const resetInputs = () => {
    console.log('reseting')
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
        <div className='grid lg:grid-cols-6 gap-2'>
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
                  <div className='flex flex-col'>
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
                        // onClick={handleAddPlayer}
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
                      <div className='flex flex-col gap-2'>
                        {/* SELECT TEAM */}
                        <div className='flex gap-2'>
                          {/* HOME TEAM */}
                          <div className='w-full'>
                            <SelectEntity
                              size='lg'
                              placeholder='Home team'
                              options={teamsList}
                              value={selectedPlayerA}
                              onSelect={setSelectedPlayerA}
                            />
                          </div>
                          {/* AWAY TEAM */}
                          <div className='w-full'>
                            <SelectEntity
                              size='lg'
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
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSubmitScore()
                                  }
                                }}
                                disabled={!selectedPlayerA}
                                inputSize='lg'
                                className='placeholder:text-sm bg-muted'
                                placeholder='Home Score'
                              />
                            </div>

                            {/* AWAY TEAM */}
                            <div className='w-full'>
                              <Input
                                id='euro-away-score'
                                value={playerBScore}
                                onChange={(e) => setPlayerBScore(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSubmitScore()
                                  }
                                }}
                                disabled={!selectedPlayerB}
                                inputSize='lg'
                                className='placeholder:text-sm bg-muted'
                                placeholder='Away Score'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ADD SCORE BUTTONS */}
                      <div className='flex flex-col w-full gap-2 mt-4'>
                        <Button variant='secondary' size='lg' onClick={handleSubmitScore}>
                          Add Score
                        </Button>
                        <Button
                          variant='primary'
                          size='lg'
                          className='border hover:bg-secondary/10'
                          onClick={() => {
                            setIsAddingScores(false)
                            resetInputs()
                          }}
                        >
                          Cancel
                        </Button>
                        {error && <p className='text-xs text-yellow-400 mt-1'>{error}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* STANDINGS TABLE */}
          <div className='col-span-2 lg:col-start-5 mx-4 mb-4 mt-4'>
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
