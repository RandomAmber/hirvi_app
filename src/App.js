import Navbar from "./Navbar"
import Games from "./pages/Games"
import Lessons from "./pages/Lessons"
import Home from "./pages/Home"
import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import Hangman from "./pages/Games/Hangman/Hangman"
import Alchemy from "./pages/Games/Alchemy/Alchemy"
import Affixes from "./pages/Games/Affixes/Affixes"
import Numbers from "./pages/Games/Numbers/Numbers"
import RegistrationForm from "./Registration"
import LoginForm from "./Login"
import React, {useState} from 'react';
import Dashboard from "./Dashboard"
import Footer from "./Footer"
import ContactForm from "./ContactForm"
import Restore from "./Restore_password"
import ReLink from "./relink"


function App() {

  return (
    <>
      <div className="page">
      <Navbar/>
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/games/hangman" element={<Hangman />} />
        <Route path="/games/numbers" element={<Numbers />} />
        <Route path="/games/alchemy" element={<Alchemy />} />
        <Route path="/games/affixes" element={<Affixes />} />
        <Route path="/registration" element={<RegistrationForm/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/contact" element={<ContactForm/>}/>
        <Route path="/login/restore_password" element={<Restore/>} />
        <Route path="/link/:link" element={<ReLink />} />
        <Route path="/link" element={<ReLink />} />
      </Routes>
      </div>
      <Footer/>
      </div>
    </>

  )


}

export default App