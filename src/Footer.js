import { Link, useMatch, useResolvedPath } from "react-router-dom"
import git from './git.png';
import mail from './mail.png';


export default function Footer() {
// contacts/ media links - github, the date of creation 2023

    return <foot className="foot">
        <ul>
        <li className=""><Link to=""  onClick={()=>{
            window.open('/contact')
        }}><img src={mail} alt='mail' className="icon"></img></Link></li>
        <li className=""><Link to="https://github.com/RandomAmber/hirvi_app"><img src={git} alt='git' className="icon"></img></Link></li>
        </ul>
        <p className="date">2023-2023</p>
    </foot>
}
