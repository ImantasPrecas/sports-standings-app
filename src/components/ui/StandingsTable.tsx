import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table'

interface StandingsTableProps {
  tableData: {
    standings: {
      name: string
      played: number
      won: number
      drawn: number
      lost: number
      points: number
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
            .filter((header) => header.key !== 'team')
            .map((header) => (
              <TableHead
                className='flex items-center justify-center min-w-10 '
                key={header.key}
              >
                {header.title}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody className='w-full max-h-42 overflow-y-auto block'>
        {tableData.standings.map((team) => (
          <TableRow key={team.name} className='flex w-full text-foreground' rowLine={rowLine}>
            <TableCell className='flex-1'>{team.name}</TableCell>
            <TableCell className='min-w-10 text-center'>{team.played}</TableCell>
            <TableCell className='min-w-10 text-center'>{team.won}</TableCell>
            <TableCell className='min-w-10 text-center'>{team.drawn}</TableCell>
            <TableCell className='min-w-10 text-center'>{team.lost}</TableCell>
            <TableCell className='min-w-10 text-center'>{team.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
