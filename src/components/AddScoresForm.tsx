import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { SelectEntity } from './ui/SelectEntity'
import { useAddScores } from '@/hooks/useAddSores'
import type { IMatch } from '@/interfaces/interface'

export const AddScoresForm = ({
  teamsList,
  existingMatches,
  label,
  cancelButton = false,
  addMatch,
  setIsAddingScores,
}: {
  teamsList: { id: string; name: string }[]
  existingMatches: IMatch[]
  label?: string
  cancelButton?: boolean
  addMatch: (teamA: string, teamB: string, scoreA: number, scoreB: number) => void
  setIsAddingScores?: (isAdding: boolean) => void
}) => {
  const {
    p1,
    setP1,
    p2,
    setP2,
    score1,
    setScore1,
    score2,
    setScore2,
    scoreError,
    resetInputs,
    handleSubmitScore,
  } = useAddScores({ existingMatches, addMatch })

  return (
    <>
      <div className='flex flex-col gap-2'>
        {label && <p className='text-xs font-semibold'>{label}</p>}
        {/* SELECT TEAM */}
        <div className='flex gap-2'>
          {/* HOME TEAM */}
          <div className='w-full'>
            <SelectEntity
              size='sm'
              placeholder='Home team'
              options={teamsList}
              value={p1}
              onSelect={setP1}
            />
          </div>

          {/* AWAY TEAM */}
          <div className='w-full'>
            <SelectEntity
              size='sm'
              placeholder='Away team'
              options={teamsList}
              value={p2}
              onSelect={setP2}
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
                value={score1}
                onChange={(e) => setScore1(e.target.value)}
                placeholder='Home Score'
                disabled={!p1}
                inputSize='sm'
                className='placeholder:text-sm'
              />
            </div>

            {/* AWAY TEAM */}
            <div className='w-full'>
              <Input
                id='prem-away-score'
                value={score2}
                onChange={(e) => setScore2(e.target.value)}
                placeholder='Away Score'
                disabled={!p2}
                inputSize='sm'
                className='placeholder:text-sm'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full gap-2'>
        <Button variant='secondary' size='sm' onClick={handleSubmitScore}>
          Add Score
        </Button>
        {cancelButton && (
          <Button
            variant='primary'
            size='sm'
            className='border hover:bg-secondary/10'
            onClick={() => {
              console.log('clicked')
              if (setIsAddingScores) {
                setIsAddingScores(false)
              }
              resetInputs()
            }}
          >
            Cancel
          </Button>
        )}
      </div>
      {scoreError && <p className='text-xs text-red-500 mt-1'>{scoreError}</p>}
    </>
    // </div>
  )
}
