import { Card } from '@/components/ui/Card'
import { CardHeader } from '@/components/ui/CardHeader'
import { CardTitle } from '@/components/ui/CardTitle'
import { Input } from '@/components/ui/Input'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SelectEntity } from '@/components/ui/SelectEntity'
import { Button } from './ui/Button'
import { StandingsTable } from './ui/StandingsTable'

import { useState } from 'react'
import UsePremierLeagueStore from '@/store/premierLeagueStore'

export const PremierLeagueComponent = () => {
  const { getTeamsList, addTeam, getStandingsTable, addMatch, getMatches } =
    UsePremierLeagueStore()
  const [newTeamName, setNewTeamName] = useState('')
  const [selectedTeamA, setSelectedTeamA] = useState('')
  const [selectedTeamB, setSelectedTeamB] = useState('')
  const [teamAScore, setTeamAScore] = useState('')
  const [teamBScore, setTeamBScore] = useState('')
  const [newTeamError, setNewTeamError] = useState('')
  const [scoreError, setScoreError] = useState('')

  const standingsTable = getStandingsTable()
  const teamsList = getTeamsList()

  const handleSubmitNewTeam = () => {
    if (newTeamName.trim()) {
      if (teamsList.find((p) => p.name === newTeamName.trim())) {
        setNewTeamError('Team already exists')
        return
      }
    }
    addTeam(newTeamName.trim())
    resetInputs()
  }

  const handleSubmitScore = () => {
    if (
      validateInput(teamAScore) &&
      validateInput(teamBScore) &&
      selectedTeamA &&
      selectedTeamB
    ) {
      if (checkForDuplication(selectedTeamA, selectedTeamB)) {
        setScoreError('Teams already played against each other')
        return
      }
      if (selectedTeamA === selectedTeamB) {
        setScoreError('Teams must be different')
        return
      }
      addMatch(selectedTeamA, selectedTeamB, Number(teamAScore), Number(teamBScore))

      resetInputs()
    } else {
      setScoreError('Please enter valid scores and select both teams.')
    }
  }

  const validateInput = (value: string) => {
    const regex = /^[0-9]+$/
    return regex.test(value)
  }
  const resetInputs = () => {
    setNewTeamName('')
    setSelectedTeamA('')
    setSelectedTeamB('')
    setTeamAScore('')
    setTeamBScore('')
    setNewTeamError('')
    setScoreError('')
  }

  const checkForDuplication = (teamA: string, teamB: string) => {
    const existingMatch = Object.values(getMatches()).find(
      (match) =>
        (match.teamA === teamA && match.teamB === teamB) ||
        (match.teamA === teamB && match.teamB === teamA)
    )
    return !!existingMatch
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmitNewTeam()
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
                  onClick={handleSubmitNewTeam}
                >
                  Add
                </Button>
              </div>
              {newTeamError && (
                <p className='text-xs text-red-500 mt-1'>{newTeamError}</p>
              )}
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
