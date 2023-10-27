import { Link } from "react-router-dom";


export default function LessonMenu() {
    return <>
    <div className="lesson-menu">
        <ul>
            <li>
                <button className="lesson_name" onClick={
                    ()=>{
                    console.log('function')
                    console.log(document.getElementsByClassName("Drop_lesson")[0].classList)
                    document.getElementsByClassName("Drop_lesson")[0].classList.toggle("show");
                    }}>Lesson 1
                </button>
                <div id="Drop" className="Drop_lesson">
                    <a href='#' >Meterial</a>
                    <a href='#' >Homework</a>
                </div>
            </li>
        </ul>
    </div>
    </>
}