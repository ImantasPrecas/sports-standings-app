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
import {
  checkExistingEntity,
  checkForDuplication,
  validateNumericInput,
} from '@/lib/utils'

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
  const existingMatches = Object.values(getMatches())

  const handleAddNewTeam = () => {
    const teamName = newTeamName.trim()

    if (!teamName) {
      setNewTeamError('Team name is required')
      return
    }
    if (checkExistingEntity(teamsList, 'id', teamName.toLowerCase())) {
      setNewTeamError('Team already exists')
      return
    }

    addTeam(teamName)
    resetInputs()
  }

  const handleSubmitScore = () => {
    if (!selectedTeamA || !selectedTeamB) {
      setScoreError('Please select both teams.')
      return
    }

    if (selectedTeamA === selectedTeamB) {
      setScoreError('Teams must be different')
      return
    }

    if (!validateNumericInput(teamAScore) || !validateNumericInput(teamBScore)) {
      setScoreError('Please enter valid scores for both teams.')
      return
    }

    if (checkForDuplication(selectedTeamA, selectedTeamB, existingMatches)) {
      setScoreError('Teams already played against each other')
      return
    }

    addMatch(selectedTeamA, selectedTeamB, Number(teamAScore), Number(teamBScore))
    resetInputs()
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
