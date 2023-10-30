import { json } from "react-router-dom";
import Number from "./Number";
import rules from '../rules.json';
import './numbers.css'
import Leaderboard from "../Leaderboard";

export default function Numbers() {
    return (
        <>
        <div className="game">
        <h1>Numbers!</h1>
        <button className='rules-button' onClick={()=>{alert(rules['Numbers']['en']);}
        }>Rules
        </button>
        <Leaderboard game_id={1} limit={5}/>
        <Number button_count={9} max_level={3} />
        </div>
        </>
   
    )
}