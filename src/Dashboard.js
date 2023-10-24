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
    const [scores, setScores] = useState([])
    const fetchUser = async () => {
      const user = await getData("http://127.0.0.1:8000/users/"+email)
      setUser(user)
      const scores = await getData("http://127.0.0.1:8000/game_rounds/"+user.id)
      setScores(scores)
    }

    useEffect(() => {
        fetchUser()
      }, [])

    if (!email) {
        return <Navigate to={redirectPath} replace />;
    }

    function get_best_score(){
        let best_score = 0
        for(let i=0;i<scores.length;i++){
            if(scores[i]['score']>best_score){
                best_score=scores[i]['score'];
            }
            console.log(best_score)
        }
    return best_score
    }

    return <>
    <h1>Welcome, {user['name']}</h1>
    <h1>Your total score in Numbers is {get_best_score()}</h1>
    </>
}

export default Dashboard;