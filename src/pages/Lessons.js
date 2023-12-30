import lesson1 from './Lessons/Lesson1.js';
import { useParams, Route, Routes } from 'react-router-dom';
import LessonMenu from './Lessons/LessonMenu.js';
import "../css/Lesson-menu.css";
//import Lesson1 from "./Lessons/Lesson1.js";
import Lesson2 from "./Lessons/Lesson2.js";

export default function Lessons() {
    let config = require("./Lessons/Lesson1.js").default
    let my_routes = []
    for (let i=0; i<config["router"].length; i++){
        my_routes.push(<Route path={config["router"][i]["url"]} element={config["router"][i]["function"]()} />)
    }
    console.log(my_routes)
    return <div className="lesson-container">
    <LessonMenu/>
    <Routes>
        <Route path="/" element={config["router"][0]["function"]()} />
        {my_routes}
    </Routes>
    </div>
}