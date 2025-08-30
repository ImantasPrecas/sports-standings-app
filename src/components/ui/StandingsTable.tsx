import type { IStandingsTable } from '@/interfaces/interface'
import { Check, X } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table'
import ReactCountryFlag from 'react-country-flag'
import countryList from 'react-select-country-list'

interface StandingsTableProps {
  tableData: IStandingsTable
  title?: string
  rowLine?: boolean
  withFlag?: boolean
}

export const StandingsTable = ({
  tableData,
  title,
  rowLine,
  withFlag,
}: StandingsTableProps) => {
  return (
    <>
      {title && <p className='text-primary-foreground mb-4'>{title}</p>}
      <Table className='flex-col'>
        <TableHeader className='flex w-full'>
          <TableRow className='flex w-full' rowLine={rowLine}>
            <TableHead className='flex flex-1 justify-start items-center'>
              {tableData.tableHeader[0].title}
            </TableHead>
            {tableData.tableHeader
              .filter((header) => header.key !== 'name')
              .map((header) => (
                <TableHead
                  className={'flex items-center justify-center min-w-[40px]'}
                  key={header.key}
                >
                  <p>{header.title}</p>
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        {tableData.standings.length !== 0 && (
          <TableBody className='w-full max-h-42 overflow-y-auto block'>
            {tableData.standings.map((team) => {
              return (
                <TableRow
                  key={team.id}
                  className='flex w-full text-foreground'
                  rowLine={rowLine}
                >
                  <TableCell className='flex flex-1 items-center'>
                    {withFlag && (
                      <ReactCountryFlag
                        className='mr-2'
                        countryCode={countryList().getValue(team.id || '')}
                      />
                    )}
                    <p>{team.name}</p>
                  </TableCell>
                  {team.matches !== undefined && (
                    <TableCell className='min-w-10 text-center'>{team.matches}</TableCell>
                  )}
                  {team.won !== undefined && (
                    <TableCell className='min-w-10 text-center'>
                      <p className='flex items-center justify-center gap-1'>
                        {team.won}
                        {team.icons?.won && <Check className='h-4 text-green-500' />}
                      </p>
                    </TableCell>
                  )}
                  {team.drawn !== undefined && (
                    <TableCell className='min-w-10 text-center'>{team.drawn}</TableCell>
                  )}
                  {team.lost !== undefined && (
                    <TableCell className='min-w-10 text-center'>
                      <p className='flex items-center justify-center gap-1'>
                        {team.lost}
                        {team.icons?.lost && <X className='h-4 text-red-500' />}
                      </p>
                    </TableCell>
                  )}
                  {team.points !== undefined && (
                    <TableCell className='min-w-10 text-center'>{team.points}</TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        )}

        {tableData.standings.length === 0 && (
          <TableFooter>
            <TableRow className='my-4'>
              <TableHead>
                <p className='text-sm font-normal text-center'>
                  No standings available. Add a team to get started.
                </p>
              </TableHead>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </>
  )
}
