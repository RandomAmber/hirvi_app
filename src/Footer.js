import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import git from './img/git.png';
import mail from './img/mail.png';
import './css/Footer.css';


export default function Footer() {
// contacts/ media links - github, the date of creation 2023
    const navigate = useNavigate();

    return <foot className="foot">
        <ul>
        <li className=""><Link to="/contact"  onClick={()=>{
        }}><img src={mail} alt='mail' className="icon"></img></Link></li>
        <li className=""><Link to="https://github.com/RandomAmber/hirvi_app"><img src={git} alt='git' className="icon"></img></Link></li>
        </ul>
        <p className="authors">Asta & Asta</p>
        <p className="date">2023</p>

    </foot>
}
