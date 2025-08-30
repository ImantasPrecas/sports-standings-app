export interface IStandingEntry {
  id: string
  name: string
  matches?: number
  won: number
  drawn?: number
  lost: number
  points: number
  icons?: {
    won?: boolean
    lost?: boolean
  }
}

export interface IStandingsTable {
  tableHeader: { title: string; key: string, icon?: boolean }[]
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
