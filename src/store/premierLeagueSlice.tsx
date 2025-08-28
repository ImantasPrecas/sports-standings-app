import type { StateCreator } from 'zustand'
import type { StoreType } from './appStore'
import { persist } from 'zustand/middleware'
import type { JSX } from 'react'

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

export interface IStandingEntry {
  teamId: string
  name: string
  matches: number
  won: number
  drawn: number
  lost: number
  points: number
  icons?: {
    won?: JSX.Element
    lost?: JSX.Element
  }
}

export interface IStandingsTable {
  tableHeader: { title: string; key: string }[]
  standings: IStandingEntry[]
}

export interface IMatch {
  id: string
  teamA: string
  teamB: string
  scoreA: number
  scoreB: number
}

export const createPremierLeagueSlice: StateCreator<
  StoreType,
  [['zustand/immer', never]],
  // [],
  [['zustand/persist', IPremierLeagueSlice]],
  IPremierLeagueSlice
> = persist(
  (set, get) => ({
    // Initial teams and standings for development
    teams: {},
    standings: {},
    matches: {},
    duplicatedMatch: false,
    addTeam: (name: string) => {
      const id = name.toLowerCase().replace(/\s+/g, '-')
      set((state) => {
        state.teams[id] = { id, name }
        state.standings[id] = {
          teamId: id,
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
      const standings = Object.values(get().standings).sort((a, b) => b.points - a.points)
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

      const updateTeamStats = (teamId: string, result: string) => {
        const teamStats = get().standings[teamId]
        const matches = teamStats.matches + 1
        let won = teamStats.won
        let drawn = teamStats.drawn
        let lost = teamStats.lost
        let points = teamStats.points

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
          teamId,
          matches,
          won,
          drawn,
          lost,
          points,
          name: teamStats.name,
        }
      }

      set((state) => {
        state.standings[teamA] = updateTeamStats(teamA, resultA)
        state.standings[teamB] = updateTeamStats(teamB, resultB)
      })
    },
    getMatches: () => {
      return Object.values(get().matches)
    },
  }),
  { name: 'premierLeagueSlice' }
)
