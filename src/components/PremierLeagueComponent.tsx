import { Card } from './ui/Card'
import { CardHeader } from './ui/CardHeader'
import { CardTitle } from './ui/CardTitle'
import { Input } from './ui/Input'
import { SectionWrapper } from './ui/SectionWrapper'

export const PremierLeagueComponent = () => {
  return (
    <SectionWrapper className='theme-design1'>
      <Card>
        <CardHeader className='bg-primary h-full'>
          <CardTitle className='text-background'>Premier League</CardTitle>
        </CardHeader>
        {/* Add team section */}
        <div className='mx-2'>
          <div className='rounded-md bg-gray-100 px-2 py-4'>
            <p className='text-xs mb-2 font-semibold'>Add Team</p>
            <div className='flex gap-2'>
              <Input
                className='h-6 text-sm placeholder:text-sm bg-background'
                placeholder='Team Name'
              />
              <button className='rounded-md bg-secondary px-3 text-background h-6 text-sm'>
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Add Score Section */}
        <div className='mx-2 mb-4'>
          <div className='rounded-md bg-gray-100 px-2 py-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-xs font-semibold'>Add Score</p>
              {/* SELECT TEAM */}
              <div className='flex gap-2'>
                {/* HOME TEAM */}
                <div className='w-full'>
                  <select className=' h-6 w-full text-sm placeholder:text-sm bg-background border border-foreground/10 rounded-md px-2'>
                    <option value='default'>Home team</option>
                    <option value='team1'>Team 1</option>
                    <option value='team2'>Team 2</option>
                    <option value='team3'>Team 3</option>
                  </select>
                </div>

                {/* AWAY TEAM */}
                <div className='w-full'>
                  <select className=' h-6 w-full text-sm placeholder:text-sm bg-background border border-foreground/10 rounded-md px-2'>
                    <option value='default'>Away team</option>
                    <option value='team1'>Team 1</option>
                    <option value='team2'>Team 2</option>
                    <option value='team3'>Team 3</option>
                  </select>
                </div>
              </div>

              {/* ENTER SCORE */}

              <div>
                {/* HOME TEAM */}
                <div className='flex gap-2'>
                  <div className='w-full'>
                    <Input
                      className='h-6 text-sm placeholder:text-sm bg-background'
                      placeholder='Team Name'
                    />
                  </div>

                  {/* AWAY TEAM */}
                  <div className='w-full'>
                    <Input
                      className='h-6 text-sm placeholder:text-sm bg-background'
                      placeholder='Team Name'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <button className='w-full rounded-md bg-secondary px-3 text-background h-6 text-sm'>
              Add Score
            </button>
          </div>
        </div>

        {/* STANDINGS TABLE */}
        <div className='mx-2 mb-4'>
          <table className='w-full'>
            <thead className='flex bg-gray-200 border-b border-gray-300 px-2'>
              <tr className='flex w-full'>
                <th className='flex-1 text-start'>Team</th>
                <th className='w-10'>P</th>
                <th className='w-10'>W</th>
                <th className='w-10'>D</th>
                <th className='w-10'>L</th>
                <th className='w-10'>Pts</th>
              </tr>
            </thead>
            <tbody className='flex flex-col gap-2 mt-2 px-2'>
              <tr className='flex w-full border-b border-gray-300'>
                <td className='flex-1'>Team 1</td>
                <td className='w-10 text-center'>10</td>
                <td className='w-10 text-center'>8</td>
                <td className='w-10 text-center'>1</td>
                <td className='w-10 text-center'>1</td>
                <td className='w-10 text-center'>25</td>
              </tr>
              <tr className='flex w-full border-b border-gray-300'>
                <td className='flex-1'>Team 2</td>
                <td className='w-10 text-center'>10</td>
                <td className='w-10 text-center'>7</td>
                <td className='w-10 text-center'>2</td>
                <td className='w-10 text-center'>1</td>
                <td className='w-10 text-center'>23</td>
              </tr>
              <tr className='flex w-full border-b border-gray-300'>
                <td className='flex-1'>Team 3</td>
                <td className='w-10 text-center'>10</td>
                <td className='w-10 text-center'>6</td>
                <td className='w-10 text-center'>3</td>
                <td className='w-10 text-center'>1</td>
                <td className='w-10 text-center'>21</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </SectionWrapper>
  )
}
