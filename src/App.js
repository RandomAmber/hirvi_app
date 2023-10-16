import Navbar from "./Navbar"
import Games from "./pages/Games"
import About from "./pages/About"
import Grammar from "./pages/Grammar"
import Home from "./pages/Home"
import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import Hangman from "./pages/Games/Hangman"
import Alchemy from "./pages/Games/Alchemy"
import Numbers from "./pages/Games/Numbers"
import Numbers2 from "./pages/Games/Numbers2"
import TrainOfThoughts from "./pages/Games/TrainOfThoughts"
import RegistrationForm from "./Registration"
import LoginForm from "./Login"
import React, {useState} from 'react';
import AuthProvider, {useAuth} from './AuthProvider';
import Dashboard from "./Dashboard"

function App() {


  const {auth, setAuth, user, setUser} = useAuth();


  //const [user, setUser] = useState(localStorage.getItem('user'));

  console.log('app user '+user)


  return (
    <>
      <AuthProvider>
      <Navbar/>
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
        <Route path="/registration" element={<RegistrationForm/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </div>
      </AuthProvider>
    </>

  )


}
//() => {setUser(null); localStorage.setItem('user', null); console.log('u'+user); }

export default App