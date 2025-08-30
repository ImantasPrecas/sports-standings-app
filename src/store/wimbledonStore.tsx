import type { IMatch, IStandingEntry, IStandingsTable } from '@/interfaces/interface'
import { updateEntityStats } from '@/lib/storeUtils'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface Player {
  id: string
  name: string
}

export interface IWimbledonStore {
  players: Record<string, Player>
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
          addMatch: (playerA, playerB, scoreA, scoreB) => {
            const id = crypto.randomUUID()
            set((state) => {
              state.matches[id] = { id, playerA, playerB, scoreA, scoreB }
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
              const playerAStats = get().standings[playerA]
              const playerBStats = get().standings[playerB]
              const isIcons = {
                won: true,
                lost: true
              }
              state.standings[playerA] = updateEntityStats(playerA, resultA, playerAStats, isIcons)
              state.standings[playerB] = updateEntityStats(playerB, resultB, playerBStats, isIcons)
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
