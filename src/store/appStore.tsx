import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createPremierLeagueSlice, type IPremierLeagueSlice } from './premierLeagueSlice'

export type StoreType = IPremierLeagueSlice

const useAppStore = create<IPremierLeagueSlice>()(
  immer((...a) => ({
    ...createPremierLeagueSlice(...a),
  }))
)

export default useAppStore
