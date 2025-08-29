import ReactCountryFlag from 'react-country-flag'
import UseEurobasketStore from '@/store/eurobasketStore'
import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import { getCountriesList, getCountryLabel, getCountryValue } from '@/lib/utils'

import basketBall from '../assets/basketball-ball.svg'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CardHeader } from '@/components/ui/CardHeader'
import { CardTitle } from '@/components/ui/CardTitle'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Input } from '@/components/ui/Input'
import { SelectEntity } from '@/components/ui/SelectEntity'
import { StandingsTable } from '@/components/ui/StandingsTable'
import { useNewEntity } from '@/hooks/useNewEtity'
import { useAddScores } from '@/hooks/useAddSores'

export const EurobasketComponent = () => {
  const { getTeamsList, addTeam, getStandingsTable, addMatch, getMatches } =
    UseEurobasketStore()

  const countries = useMemo(() => getCountriesList(), [])

  const transformedCountries = countries.map((country) => ({
    id: country.value,
    name: country.label,
    flag: country.value,
  }))

  const teamsList = getTeamsList()
  const standingsTable = getStandingsTable()
  const existingMatches = Object.values(getMatches())
  const matches = getMatches()

  const {
    newEntityName: selectedCountry,
    setNewEntityName: setSelectedCountry,
    newEntityError: error,
    isAddingNewEntity: isAddingTeam,
    setIsAddingNewEntity: setIsAddingTeam,
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
    isAddingScores,
    setIsAddingScores,
    scoreError,
    handleSubmitScore,
    resetInputs,
  } = useAddScores({
    existingMatches,
    addMatch,
  })

  return (
    <SectionWrapper className='theme-design-2'>
      <Card className='bg-primary'>
        <EurobasketHeader />
        <GridLayout className='bg-primary'>
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
                  <div className='flex-col gap-2 w-full'>
                    <div className='flex gap-2'>
                      <SelectEntity
                        size='sm'
                        placeholder='Select team'
                        options={transformedCountries}
                        value={getCountryValue(selectedCountry)}
                        onSelect={(selectedOption) =>
                          setSelectedCountry(
                            getCountryLabel(selectedOption.trim().toLowerCase())
                          )
                        }
                      />
                      <Button
                        variant='secondary'
                        size='sm'
                        className='w-auto'
                        onClick={handleAddNewTeam}
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
                    </div>
                    {error && <div className='text-red-500 text-sm mt-1'>{error}</div>}
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
                    className={`col-span-1 mb-4 w-full  ${
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
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSubmitScore()
                                  }
                                }}
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
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSubmitScore()
                                  }
                                }}
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
                      <div className='flex flex-col w-full gap-2 mt-4'>
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
                        {scoreError && (
                          <p className='text-xs text-red-500 mt-1'>{scoreError}</p>
                        )}
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
              {matches.length === 0 ? (
                <p className='text-sm text-center'>No matches played yet</p>
              ) : (
                <p className='text-sm mb-2 hidden lg:block'>Matches</p>
              )}
              <ul className='flex flex-col'>
                {matches.map((match, index, array) => {
                  const teamAFlag = getCountryValue(match.teamA!)
                  const teamBFlag = getCountryValue(match.teamB!)
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
        </GridLayout>
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

export const GridLayout = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <div className={`grid lg:grid-cols-6 gap-2 ${className}`}>{children}</div>
}
