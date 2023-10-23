import AuthProvider, {useAuth} from './AuthProvider';
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {getData} from './utiles.js';

function Dashboard() {

    const redirectPath = '/login'

    let email = localStorage.getItem('user')
    if (email=='null'){
        email = null
    }

    const [user, setUser] = useState([])
    const fetchUser = async () => {
      const user = await getData("http://127.0.0.1:8000/users/"+email)
      setUser(user)
    }

    useEffect(() => {
        fetchUser()
      }, [])

    if (!email) {
        return <Navigate to={redirectPath} replace />;
    }
    
    console.log(user)

    return <h1>Welcome, {user['name']}</h1>
}

export default Dashboard;