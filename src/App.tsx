import { EurobasketComponent } from './components/EurobasketComponent'
import { PremierLeagueComponent } from './components/PremierLeagueComponent'

function App() {
  return (
    <>
      <main>
        <header>
          <h1 className='text-4xl'>Sports Standings App</h1>
        </header>
        <PremierLeagueComponent />
        <EurobasketComponent />
      </main>
    </>
  )
}

export default App
