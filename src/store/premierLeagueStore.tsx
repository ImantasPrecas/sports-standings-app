import type { IMatch, IStandingEntry, IStandingsTable } from '@/interfaces/interface'
import { updateEntityStats } from '@/lib/storeUtils'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface Team {
  id: string
  name: string
}

export interface IPremierLeagueSlice {
  teams: Record<string, Team>
  standings: Record<string, IStandingEntry>
  matches: Record<string, IMatch>
  addTeam: (name: string) => void
  getTeamsList: () => { id: string; name: string }[]
  getStandingsTable: () => IStandingsTable
  addMatch: (teamA: string, teamB: string, scoreA: number, scoreB: number) => void
  getMatches: () => IMatch[]
}

const UsePremierLeagueStore = create<IPremierLeagueSlice>()(
  devtools(
    immer(
      persist(
        (set, get) => ({
          teams: {},
          standings: {},
          matches: {},
          duplicatedMatch: false,
          addTeam: (name: string) => {
            const id = name.toLowerCase().replace(/\s+/g, '-')
            set((state) => {
              state.teams[id] = { id, name }
              state.standings[id] = {
                id,
                name,
                matches: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                points: 0,
              }
            })
          },
          getTeamsList: () => {
            const { teams } = get()
            return Object.entries(teams).map(([id, team]) => ({ id, name: team.name }))
          },
          getStandingsTable: () => {
            const standings = Object.values(get().standings).sort(
              (a, b) => b.points - a.points
            )
            return {
              tableHeader: [
                { title: 'Team', key: 'name' },
                { title: 'P', key: 'matches' },
                { title: 'W', key: 'won' },
                { title: 'D', key: 'drawn' },
                { title: 'L', key: 'lost' },
                { title: 'Pts', key: 'points' },
              ],
              standings,
            }
          },
          addMatch: (teamA, teamB, scoreA, scoreB) => {
            const id = crypto.randomUUID()
            set((state) => {
              state.matches[id] = { id, teamA, teamB, scoreA, scoreB }
            })

            let resultA: 'win' | 'loss' | 'draw' = 'draw'
            let resultB: 'win' | 'loss' | 'draw' = 'draw'

            if (scoreA > scoreB) {
              resultA = 'win'
              resultB = 'loss'
            } else if (scoreA < scoreB) {
              resultA = 'loss'
              resultB = 'win'
            }

            set((state) => {
              const teamAStats = get().standings[teamA]
              const teamBStats = get().standings[teamB]

              state.standings[teamA] = updateEntityStats(teamA, resultA, teamAStats)
              state.standings[teamB] = updateEntityStats(teamB, resultB, teamBStats)
            })
          },
          getMatches: () => {
            return Object.values(get().matches)
          },
        }),
        { name: 'premier-league' }
      )
    )
  )
)

export default UsePremierLeagueStore
