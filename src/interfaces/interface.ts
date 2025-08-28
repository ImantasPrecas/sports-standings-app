import type { JSX } from 'react'

export interface IStandingEntry {
  teamId?: string
  playerId?: string
  name: string
  matches?: number
  won: number
  drawn?: number
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
  teamA?: string
  teamB?: string
  playerA?: string
  playerB?: string
  scoreA: number
  scoreB: number
}
