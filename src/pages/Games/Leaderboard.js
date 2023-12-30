import { json } from "react-router-dom";
import { getData } from "../../utiles";
import React, {useState, useEffect} from 'react';


export default function Leaderboard({game_id, limit}) {
    const [gameRounds, setGameRounds] = useState([])
    const [time, setTime] = useState([])
    //let gameRounds = []

    const fetchGameRounds = async () => {

        let resp = await getData("http://127.0.0.1:8000/leaderboard/"+game_id+'/'+limit)
        resp = resp ? resp : [];
        setGameRounds(resp)
        console.log('op')
    }

    const timer = async () => {
        let date = new Date().toLocaleString()
        setInterval( () => {
              setTime(date)
        }, 1000)
    }

    useEffect(() => {
        fetchGameRounds()
      }, [])

    
    let board = []
    for(let i=0; i<gameRounds.length; i++){
        board.push(
            <div className="leaderboard_note">
            <p className="leaderboard_name">{gameRounds[i]['name']}</p>
            <p className="leaderboard_score">{gameRounds[i]['score']}</p>
            </div>
        )
    }
    console.log(gameRounds)
    /*setInterval( () => {
        fetchGameRounds()
    }, 10000)*/
    useEffect(() => {
        const interval = setInterval(() => {
            fetchGameRounds()
        }, 2000)
        return () => clearInterval(interval)
      }, []);

    return (
        <>
        <div className="leaderboard">
        <h1>Leaderboard</h1>
        {board}
        </div>
        </>
   
    )
}