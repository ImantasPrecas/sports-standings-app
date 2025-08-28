import type { StateCreator } from 'zustand'
import type { StoreType } from './appStore'

interface Team {
  id: string
  name: string
}

export interface IPremierLeagueSlice {
  teams: Record<string, Team>
  standings: Record<string, IStandingEntry>
  addTeam: (name: string) => void
  getTeamsList: () => { id: string; name: string }[]
  getStandingsTable: () => IStandingsTable
}

export interface IStandingEntry {
  teamId: string
  name: string
  matches: number
  won: number
  drawn: number
  lost: number
  points: number
}

export interface IStandingsTable {
  tableHeader: { title: string; key: string }[]
  standings: IStandingEntry[]
}

export const createPremierLeagueSlice: StateCreator<
  StoreType,
  [],
  [],
  IPremierLeagueSlice
> = (set, get) => ({
  teams: { arsenal: { id: 'arsenal', name: 'Arsenal' } },
  standings: {},
  addTeam: (name: string) => {
    const id = crypto.randomUUID()
    set((state) => ({
      teams: {
        ...state.teams,
        [id]: { id, name },
      },
      standings: {
        ...state.standings,
        [id]: {
          teamId: id,
          name,
          matches: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          points: 0,
        },
      },
    }))
  },
  getTeamsList: () => {
    const { teams } = get()
    return Object.entries(teams).map(([id, team]) => ({ id, name: team.name }))
  },
  getStandingsTable: () => {
    const standings = Object.values(get().standings)
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
  }
})
