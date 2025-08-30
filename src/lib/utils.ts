import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import countryList from 'react-select-country-list'
import type { IMatch } from '@/interfaces/interface'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCountriesList = () => {
  return countryList().getData()
}

export const getCountryLabel = (countryCode: string) => {
  return countryList().getLabel(countryCode)
}
export const getCountryValue = (value: string) => {
  return countryList().getValue(value)
}

export const validateNumericInput = (value: string) => {
  const regex = /^[0-9]+$/
  return regex.test(value)
}

export const checkForDuplication = (
  teamA: string,
  teamB: string,
  existingMatches: IMatch[]
) => {
  const existingMatch = existingMatches.find(
    (match) =>
      (match.teamA === teamA && match.teamB === teamB) ||
      (match.teamA === teamB && match.teamB === teamA)
  )
  return !!existingMatch
}

export const checkExistingEntity = <T>(
  entities: T[],
  identifier: string,
  value: string
) => {
  return entities.find((entity) => entity[identifier as keyof T] === value)
}
