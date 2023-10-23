import Navbar from "./Navbar"
import Games from "./pages/Games"
import Grammar from "./pages/Grammar"
import Home from "./pages/Home"
import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import Hangman from "./pages/Games/Hangman/Hangman"
import Alchemy from "./pages/Games/Alchemy/Alchemy"
import Numbers from "./pages/Games/Numbers/Numbers"
import RegistrationForm from "./Registration"
import LoginForm from "./Login"
import React, {useState} from 'react';
import AuthProvider, {useAuth} from './AuthProvider';
import Dashboard from "./Dashboard"
import Footer from "./Footer"
import ContactForm from "./ContactForm"
import Restore from "./Restore_password"


function App() {


  const {auth, setAuth, user, setUser} = useAuth();


  //const [user, setUser] = useState(localStorage.getItem('user'));

  console.log('app user '+user)


  return (
    <>
      <AuthProvider>
      <div className="page">
      <Navbar/>
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/games/hangman" element={<Hangman />} />
        <Route path="/games/numbers" element={<Numbers />} />
        <Route path="/games/alchemy" element={<Alchemy />} />
        <Route path="/registration" element={<RegistrationForm/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/contact" element={<ContactForm/>}/>
        <Route path="/login/restore_password" element={<Restore/>} />
      </Routes>
      </div>
      <Footer/>
      </div>
      </AuthProvider>
    </>

  )


}
//() => {setUser(null); localStorage.setItem('user', null); console.log('u'+user); }

export default App