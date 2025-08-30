import type { IStandingEntry } from '@/interfaces/interface'

export const updateEntityStats = (
  id: string,
  result: string,
  teamStats: IStandingEntry,
  isIcons?: { [key: string]: boolean }
) => {
  const matches = (teamStats.matches || 0) + 1
  let won = teamStats.won || 0
  let drawn = teamStats.drawn || 0
  let lost = teamStats.lost || 0
  let points = teamStats.points || 0

  if (result === 'win') {
    won += 1
    points += 3
  } else if (result === 'draw') {
    drawn += 1
    points += 1
  } else if (result === 'loss') {
    lost += 1
  }

  return {
    id,
    matches,
    won,
    drawn,
    lost,
    points,
    name: teamStats.name,
    icons: isIcons,
  }
}
