import { json } from "react-router-dom";
import Number from "./Number";
import rules from './rules.json';

export default function Numbers() {
    return (
        <>
        <div className="container">
        <h1>Numbers!</h1>
        <button onClick={()=>{alert(rules['Numbers']['en']);}
        } class="">Read the rules
        </button>
        <Number button_count={10} max_level={3}/>
        </div>

        </>
   
    )
}