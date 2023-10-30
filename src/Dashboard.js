import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {getData} from './utiles.js';

function Dashboard() {

    const redirectPath = '/login'

    let email = localStorage.getItem('user')


    const [user, setUser] = useState([])
    const [scores, setScores] = useState([])

    const fetchUser = async () => {
        const user = await getData("http://127.0.0.1:8000/users/"+email)
        setUser(user)
        const scores = await getData("http://127.0.0.1:8000/game_rounds/"+user.id)
        if (scores){
            setScores(scores)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (!email) {
        return <Navigate to={redirectPath} replace />;
    }

    let user_scores = []
    for(let i=0;i<scores.length;i++){
        user_scores.push(
            <div className="dashboard_scores">
            <p className="dashboard_game_name">{scores[i]['name']}</p>
            <p className="dashboard_score">{scores[i]['score']}</p>
            </div>
        );
    }

    return <>
    <h1>Welcome, {user['name']}</h1>
    <h1>Your total scores:</h1>
    {user_scores}
    </>
}

export default Dashboard;