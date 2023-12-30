import { Link } from "react-router-dom";
import { useState } from "react";
import "../../css/Lesson-menu.css";
import {config} from "./LessonConfig.js";


export default function LessonMenu() {
    const [button, setButton] = useState([])

    for(let i=0; i<config.lenght;i++){
        //config[0]["name"]
    }

    function toggle({className}){

    }

    return <div className="lesson-menu">
        <ul>
            <li>
            <button onClick={
            ()=>{
                console.log('function')
            document.getElementById("lesson1").classList.toggle("show");
            console.log(document.getElementById("lesson1").classList);
            setButton('lesson1')
            }
        } className="dropbtn-lesson">Lesson 1</button>
            <div id="lesson1" class="">
                <a href="/lessons/1">Homework</a>
            </div>
            </li>
            <li>
            <button onClick={
            ()=>{
                console.log('function')
            document.getElementById("lesson2").classList.toggle("show");
            console.log(document.getElementById("lesson2").classList)
            setButton('lesson2')
            }
        } className="dropbtn-lesson">Lesson 2</button>
            <div id="lesson2" class="dropdown-content-lesson">
                <a href="/games/numbers">Homework</a>
            </div>
            </li>
        </ul>
    </div>
}