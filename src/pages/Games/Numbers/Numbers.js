import { json } from "react-router-dom";
import Number from "./Number";
import rules from '../rules.json';
import './numbers.css'
import Leaderboard from "../Leaderboard";
import "../Button"

export default function Numbers() {
    return (
        <div className="main Container">
            <div className="nameContainer">
                <h1>Numbers!</h1>
            </div>
            <div className="areasContainer">
                <div className="leftArea">
                    <button className='button' onClick={() => { alert(rules['Numbers']['en']); }
                    }>Rules</button>
                    <Leaderboard game_id={1} limit={5} />
                    
                    
                </div>
                <div className="centreConainer">
                    <Number button_count={9} max_level={3} />
                </div>
                <div className="rightArea"></div>




            </div>
        </div>

    )
}