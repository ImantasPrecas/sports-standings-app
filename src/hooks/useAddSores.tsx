import type { IMatch } from '@/interfaces/interface'
import { checkForDuplication, validateNumericInput } from '@/lib/utils'
import { useState } from 'react'

interface IuseAddScoresProps {
  existingMatches: IMatch[]
  addMatch: (teamA: string, teamB: string, scoreA: number, scoreB: number) => void
}

export const useAddScores = ({ existingMatches, addMatch }: IuseAddScoresProps) => {
  const [p1, setP1] = useState<string>('')
  const [p2, setP2] = useState<string>('')
  const [score1, setScore1] = useState<string>('')
  const [score2, setScore2] = useState<string>('')
  const [scoreError, setScoreError] = useState<string>('')
  const [isAddingScores, setIsAddingScores] = useState(false)
  const handleSubmitScore = () => {
    if (!p1 || !p2) {
      setScoreError('Please select both teams.')
      return
    }

    if (p1 === p2) {
      setScoreError('Teams must be different')
      return
    }

    if (!validateNumericInput(score1) || !validateNumericInput(score2)) {
      setScoreError('Please enter valid scores for both teams.')
      return
    }

    if (checkForDuplication(p1, p2, existingMatches)) {
      setScoreError('Teams already played against each other')
      return
    }

    addMatch(p1, p2, Number(score1), Number(score2))
    resetInputs()
  }

  const resetInputs = () => {
    setP1('')
    setP2('')
    setScore1('')
    setScore2('')
    setScoreError('')
  }

  return {
    p1,
    setP1,
    p2,
    setP2,
    score1,
    setScore1,
    score2,
    setScore2,
    scoreError,
    isAddingScores,
    setIsAddingScores,
    handleSubmitScore,
    resetInputs,
  }
}
