import Navbar from "./Navbar"
import Games from "./pages/Games"
import About from "./pages/About"
import Grammar from "./pages/Grammar"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Hangman from "./pages/Games/Hangman"
import Alchemy from "./pages/Games/Alchemy"
import Numbers from "./pages/Games/Numbers"
import Numbers2 from "./pages/Games/Numbers2"
import TrainOfThoughts from "./pages/Games/TrainOfThoughts"

function App() {


  return (
    <>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/about" element={<About />} />
        <Route path="/games/hangman" element={<Hangman />} />
        <Route path="/games/numbers" element={<Numbers />} />
        <Route path="/games/alchemy" element={<Alchemy />} />
        <Route path="/games/numbers2" element={<Numbers2 />} />
        <Route path="/games/train" element={<TrainOfThoughts />} />
       
      </Routes>
      </div>

    </>

  )


}

export default App