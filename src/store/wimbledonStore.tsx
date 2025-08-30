import type { IMatch, IStandingEntry, IStandingsTable } from '@/interfaces/interface'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface Team {
  id: string
  name: string
}

export interface IWimbledonStore {
  players: Record<string, Team>
  standings: Record<string, IStandingEntry>
  matches: Record<string, IMatch>
  addPlayer: (name: string) => void
  getPlayersList: () => { id: string; name: string }[]
  getStandingsTable: () => IStandingsTable
  addMatch: (playerA: string, playerB: string, scoreA: number, scoreB: number) => void
  getMatches: () => IMatch[]
}

const useWimbledonStore = create<IWimbledonStore>()(
  devtools(
    immer(
      persist(
        (set, get) => ({
          players: {},
          standings: {},
          matches: {},
          duplicatedMatch: false,
          addPlayer: (name: string) => {
            const id = name.toLowerCase().replace(/\s+/g, '-')
            set((state) => {
              state.players[id] = { id, name }
              state.standings[id] = {
                id,
                name,
                matches: 0,
                won: 0,
                lost: 0,
                points: 0,
                icons: {
                  won: true,
                  lost: true,
                }
              }
            })
          },
          getPlayersList: () => {
            const { players } = get()
            return Object.entries(players).map(([id, player]) => ({
              id,
              name: player.name,
            }))
          },
          getStandingsTable: () => {
            const standings = Object.values(get().standings).sort(
              (a, b) => b.points - a.points
            )
            return {
              tableHeader: [
                { title: 'Player', key: 'name' },
                { title: 'M', key: 'matches' },
                { title: 'W', key: 'won', icon: true },
                { title: 'L', key: 'lost', icon: true },
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

            const updatePlayerStats = (id: string, result: string) => {
              const playerStats = get().standings[id] || {
                id,
                name: get().players[id]?.name || '',
                matches: 0,
                won: 0,
                lost: 0,
                points: 0,
                icons: {
                  won: true,
                  lost: true,
                }
              }
              const matches = (playerStats.matches || 0) + 1
              let won = playerStats.won || 0
              let lost = playerStats.lost || 0
              let points = playerStats.points || 0

              if (result === 'win') {
                won += 1
                points += 3
              } else if (result === 'draw') {
                points += 1
              } else if (result === 'loss') {
                lost += 1
              }

              return {
                id,
                matches,
                won,
                lost,
                points,
                name: playerStats.name,
                icons: {
                  won: true,
                  lost: true,
                }
              }
            }

            set((state) => {
              state.standings[teamA] = updatePlayerStats(teamA, resultA)
              state.standings[teamB] = updatePlayerStats(teamB, resultB)
            })
          },
          getMatches: () => {
            return Object.values(get().matches)
          },
        }),
        { name: 'wimbledon' }
      )
    )
  )
)

export default useWimbledonStore
