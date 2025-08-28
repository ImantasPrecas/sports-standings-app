import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createPremierLeagueSlice, type IPremierLeagueSlice } from './premierLeagueSlice'
import { devtools } from 'zustand/middleware'

export type StoreType = IPremierLeagueSlice

const useAppStore = create<IPremierLeagueSlice>()(
  immer(
    devtools((...a) => ({
      ...createPremierLeagueSlice(...a),
    }))
  )
)

export default useAppStore
