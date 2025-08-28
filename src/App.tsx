// import { EurobasketComponent } from './components/EurobasketComponent'
import { PremierLeagueComponent } from './components/PremierLeagueComponent'
// import { WimbledonComponent } from './components/WimbledonComponent'

function App() {
  return (
    <>
      <main>
        <header>
          <h1 className='text-4xl'>Sports Standings App</h1>
        </header>
        <PremierLeagueComponent />
        {/* <EurobasketComponent />
        <WimbledonComponent /> */}
      </main>
    </>
  )
}

export default App
