import lesson1 from './Lessons/Lesson1.js';
import { useParams } from 'react-router-dom';
import LessonMenu from './Lessons/LessonMenu.js';

export default function Lessons() {

    return <>
    <LessonMenu/>
    <h1>Lessons all description</h1>
    </>
}