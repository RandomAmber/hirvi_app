import { json } from "react-router-dom";
import { getData } from "../../utiles";
import React, {useState, useEffect} from 'react';


export default function Leaderboard({game_id, limit}) {
    const [gameRounds, setGameRounds] = useState([])

    const fetchGameRounds = async () => {

        const gameRounds = await getData("http://127.0.0.1:8000/leaderboard/"+game_id+'/'+limit)
        setGameRounds(gameRounds)
    }

    useEffect(() => {
        fetchGameRounds()
      }, [])

      console.log(gameRounds)
    
    let board = []
    for(let i=0; i<gameRounds.length; i++){
        board.push(
            <div className="leaderboard_note">
            <p className="leaderboard_name">{gameRounds[i]['name']}</p>
            <p className="leaderboard_score">{gameRounds[i]['score']}</p>
            </div>
        )
    }

    return (
        <>
        <div className="leaderboard">
        <h1>Leaderboard</h1>
        {board}
        </div>

        </>
   
    )
}