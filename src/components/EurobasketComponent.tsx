import { Plus } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { CardHeader } from './ui/CardHeader'
import { CardTitle } from './ui/CardTitle'
import { SectionWrapper } from './ui/SectionWrapper'
import { Input } from './ui/Input'
import { SelectEntity } from './ui/SelectEntity'
import { StandingsTable } from './ui/StandingsTable'
import basketBall from '../assets/basketball-ball.svg'
import countryList from 'react-select-country-list'
import { useState } from 'react'
import UseEurobasketStore from '@/store/eurobasketStore'
import ReactCountryFlag from 'react-country-flag'

export const EurobasketComponent = () => {
  const { getTeamsList, addTeam, getStandingsTable, addMatch, getMatches } =
    UseEurobasketStore()
  const [isAddingTeam, setIsAddingTeam] = useState(false)
  const [isAddingScores, setIsAddingScores] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedTeamA, setSelectedTeamA] = useState('')
  const [selectedTeamB, setSelectedTeamB] = useState('')
  const [teamAScore, setTeamAScore] = useState('')
  const [teamBScore, setTeamBScore] = useState('')
  const [error, setError] = useState('')

  const countries = countryList().getData()
  const transformedCountries = countries.map((country) => ({
    id: country.value,
    name: country.label,
    flag: country.value,
  }))

  const teamsList = getTeamsList()
  const standingsTable = getStandingsTable()
  const matches = getMatches()

  const handleSubmitScore = () => {
    if (
      validateInput(teamAScore) &&
      validateInput(teamBScore) &&
      selectedTeamA &&
      selectedTeamB
    ) {
      if (checkForDuplication(selectedTeamA, selectedTeamB)) {
        setError('Teams already played against each other')
        return
      }
      addMatch(selectedTeamA, selectedTeamB, Number(teamAScore), Number(teamBScore))
      setIsAddingScores(false)
      resetInputs()
    } else {
      setError('Please enter valid scores and select both teams.')
    }
  }

  const checkForDuplication = (teamA: string, teamB: string) => {
    const existingMatch = Object.values(getMatches()).find(
      (match) =>
        (match.teamA === teamA && match.teamB === teamB) ||
        (match.teamA === teamB && match.teamB === teamA)
    )
    return !!existingMatch
  }

  const validateInput = (value: string) => {
    const regex = /^[0-9]+$/
    return regex.test(value)
  }
  const resetInputs = () => {
    setSelectedCountry('')
    setSelectedTeamA('')
    setSelectedTeamB('')
    setTeamAScore('')
    setTeamBScore('')
    setError('')
  }

  return (
    <SectionWrapper className='theme-design-2'>
      <Card className='bg-primary'>
        {/* Header */}
        <EurobasketHeader />
        <div className='grid lg:grid-cols-6 gap-2 bg-primary'>
          {/* ADD Buttons */}
          <div className='col-span-2 mx-2'>
            <div className='w-full rounded-md px-2'>
              <div className='flex justify-between gap-2 w-full'>
                {/* ADD TEAM BUTTON */}
                <Button
                  variant='secondary'
                  size='sm'
                  className='w-auto'
                  onClick={() => setIsAddingTeam(true)}
                  hidden={isAddingTeam || isAddingScores}
                >
                  <Plus size={16} /> Add Team
                </Button>
                {/* ADD TEAM INPUT */}
                {isAddingTeam && (
                  <div className='flex gap-2 w-full'>
                    {/* <Input id='team-name' inputSize='sm' placeholder='Team Name' /> */}
                    <SelectEntity
                      size='sm'
                      placeholder='Select team'
                      options={transformedCountries}
                      value={selectedCountry}
                      onSelect={(selectedOption) => setSelectedCountry(selectedOption)}
                    />
                    <Button
                      variant='secondary'
                      size='sm'
                      className='w-auto'
                      onClick={() => {
                        addTeam(countryList().getLabel(selectedCountry))
                        setIsAddingTeam(false)
                        resetInputs()
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant='secondary'
                      size='sm'
                      className='w-auto'
                      onClick={() => {
                        setIsAddingTeam(false)
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
                  size='sm'
                  className='w-auto'
                  hidden={isAddingTeam || isAddingScores}
                  onClick={() => setIsAddingScores(true)}
                >
                  <Plus size={16} /> Add Score
                </Button>
                {/* ADD SCORES FORM */}
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
                                id='euro-home-score'
                                value={teamAScore}
                                onChange={(e) => setTeamAScore(e.target.value)}
                                disabled={!selectedTeamA}
                                inputSize='sm'
                                className='placeholder:text-sm'
                                placeholder='Home Score'
                              />
                            </div>

                            {/* AWAY TEAM */}
                            <div className='w-full'>
                              <Input
                                id='euro-away-score'
                                value={teamBScore}
                                onChange={(e) => setTeamBScore(e.target.value)}
                                disabled={!selectedTeamB}
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
          {/* PLAYED MATCHES */}
          <div className='col-span-2 mx-6 mb-4 mt-4 lg:mt-0'>
            <div className='flex flex-col text-primary-foreground'>
              {/* Map through played matches data */}
              <ul className='flex flex-col'>
                {matches.map((match, index, array) => {
                  const teamAFlag = countryList().getValue(match.teamA)
                  const teamBFlag = countryList().getValue(match.teamB)
                  return (
                    <div key={index} className='space-y-2'>
                      <li className='flex justify-between bg-primary rounded-md'>
                        <div className='flex gap-2 text-sm'>
                          <p>
                            <ReactCountryFlag className='mr-2' countryCode={teamAFlag} />
                            {match.teamA}
                          </p>
                          <p>vs</p>
                          <p>
                            <ReactCountryFlag className='mr-2' countryCode={teamBFlag} />
                            {match.teamB}
                          </p>
                        </div>
                        <p className='text-sm'>
                          {match.scoreA} - {match.scoreB}
                        </p>
                      </li>
                      {index < array.length - 1 && (
                        <div className='h-[0.5px] bg-primary-foreground dark:bg-gray-700 mb-4 mx-2' />
                      )}
                    </div>
                  )
                })}
              </ul>
            </div>
          </div>
          {/* SCORE TABLE */}
          <div className='col-span-2 mx-6 mb-4 mt-4 lg:mt-0 pb-10'>
            <StandingsTable tableData={standingsTable} rowLine={false} withFlag={true} />
          </div>
        </div>
      </Card>
    </SectionWrapper>
  )
}

const EurobasketHeader = () => {
  return (
    <CardHeader className='bg-primary h-full'>
      <CardTitle className='flex align-center text-primary-foreground gap-4'>
        <img
          src={basketBall}
          alt='Basketball'
          className='h-6 my-auto inline-block filter brightness-0 invert'
        />
        <p>EUROBASKET</p>
      </CardTitle>
    </CardHeader>
  )
}
