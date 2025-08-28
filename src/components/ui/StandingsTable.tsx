import type { JSX } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table'

interface StandingsTableProps {
  tableData: {
    standings: {
      name: string
      matches?: number
      won?: number
      drawn?: number
      lost?: number
      points?: number
      icons?: {
        won?: JSX.Element
        lost?: JSX.Element
      }
    }[]
    tableHeader: { title: string; key: string }[]
  }
  rowLine?: boolean
}

export const StandingsTable = ({ tableData, rowLine }: StandingsTableProps) => {
  return (
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
                {header.title}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      {tableData.standings.length !== 0 && (
        <TableBody className='w-full max-h-42 overflow-y-auto block'>
          {tableData.standings.map((team) => (
            <TableRow
              key={team.name}
              className='flex w-full text-foreground'
              rowLine={rowLine}
            >
              <TableCell className='flex-1'>{team.name}</TableCell>
              {team.matches !== undefined && (
                <TableCell className='min-w-10 text-center'>{team.matches}</TableCell>
              )}
              {team.won !== undefined && (
                <TableCell className='min-w-10 text-center'>
                  <p className='flex items-center justify-center gap-1'>
                    {team.won}
                    <span> {team.icons?.won}</span>
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
                    <span> {team.icons?.lost}</span>
                  </p>
                </TableCell>
              )}
              {team.points !== undefined && (
                <TableCell className='min-w-10 text-center'>{team.points}</TableCell>
              )}
            </TableRow>
          ))}
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
  )
}
