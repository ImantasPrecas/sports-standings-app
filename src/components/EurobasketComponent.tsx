import ReactCountryFlag from 'react-country-flag'
import UseEurobasketStore from '@/store/eurobasketStore'
import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { getCountriesList, getCountryLabel, getCountryValue } from '@/lib/utils'

import basketBall from '../assets/basketball-ball.svg'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { StandingsTable } from '@/components/ui/StandingsTable'
import { useNewEntity } from '@/hooks/useNewEtity'
import { AddScoresForm } from './AddScoresForm'
import { GridLayout } from './ui/GridLayout'
import { ScoreboardHeader } from './ui/ScoreboardHeader'
import { SelectEntityForm } from './SelectEntityForm'

export const EurobasketComponent = () => {
  const { getTeamsList, addTeam, getStandingsTable, addMatch, getMatches } =
    UseEurobasketStore()

  const [isAddingScores, setIsAddingScores] = useState(false)

  const countries = useMemo(() => getCountriesList(), [])

  const transformedCountries = countries.map((country) => ({
    id: country.value,
    name: country.label,
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
    resetForm: resetInputs,
  } = useNewEntity({
    addEntity: addTeam,
    validationId: 'id',
    teamsList,
  })

  const onSelectCountry = (selectedOption: string) => {
    setSelectedCountry(getCountryLabel(selectedOption.trim().toLowerCase()))
  }

  return (
    <SectionWrapper className='theme-design-2'>
      <Card className='bg-primary'>
        <ScoreboardHeader title='EUROBASKET' icon={basketBall} />
        <GridLayout className='bg-primary'>
          {/* ADD Buttons */}
          <div className='col-span-2 mx-2'>
            <div className='w-full rounded-md px-2'>
              <div className='flex justify-between gap-2 w-full'>
                {/* SHOW ADD-TEAM-SELECT-INPUT BUTTON */}
                <Button
                  variant='secondary'
                  size='sm'
                  className='w-auto'
                  onClick={() => setIsAddingTeam(true)}
                  hidden={isAddingTeam || isAddingScores}
                >
                  <Plus size={16} /> Add Team
                </Button>
                {/* ADD TEAM SELECT INPUT */}
                {isAddingTeam && (
                  <SelectEntityForm
                    options={transformedCountries}
                    value={getCountryValue(selectedCountry)}
                    onSelect={onSelectCountry}
                    handleAddNewTeam={handleAddNewTeam}
                    resetInputs={resetInputs}
                    error={error}
                    setIsAddingTeam={setIsAddingTeam}
                  />
                )}

                {/* SHOW ADD-SCORES-FORM BUTTON */}
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
          {/* PLAYED MATCHES */}
          <div className='col-span-2 mx-6 mb-4 mt-4 lg:mt-0'>
            <div className='flex flex-col text-primary-foreground'>
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
            <StandingsTable
              tableData={standingsTable}
              title={'Score table:'}
              rowLine={false}
              withFlag={true}
              show={['won', 'drawn', 'lost', 'points']}
            />
          </div>
        </GridLayout>
      </Card>
    </SectionWrapper>
  )
}
