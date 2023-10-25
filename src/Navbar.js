import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useNavigate} from "react-router-dom";
import {useAuth} from './AuthProvider';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import logo from "./logo.png";
import en_img from "./en.png";
import ru_img from "./ru.png";
import texts from "./text.json";

export default function Navbar() {

    const {setAuth, auth, setUser, user} = useAuth();
    const navigate = useNavigate();
    let language = localStorage.getItem('language');
    language = language ? language : 'en';
    language = JSON.parse(language)

    let text = texts['Navbar']

    //const user = localStorage.getItem('user');

    let us = localStorage.getItem('user');

    if (us){
        setUser(us);
        setAuth(true);
    }

    console.log('navbar auth'+us)
    console.log('navbar auth'+auth)
    
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
        }
        }
    }


    return <nav className="nav">
        <Link to='/' className="site-title"><img src={logo} className="logo"></img>Hirvi</Link>
        <ul>
        <button onClick={
            ()=>{
                console.log('function')
            document.getElementById("myDropdown").classList.toggle("show");
        }
        } class="dropbtn">{text['Games'][language]}</button>
            <div id="myDropdown" class="dropdown-content">
                <a href="/games/numbers">Numbers</a>
                <a href="/games/hangman">Hangman</a>
                <a href="/games/alchemy">Alchemy</a>
                <a href="/games/affixes">Affixes</a>
            </div>
            <CustomLink to="/grammar">{text['Grammar'][language]}</CustomLink>
            <CustomLink to="/">{text['Home'][language]}</CustomLink>
            {
                us ? (
                    <CustomLink to="/dashboard">{text['Dashboard'][language]}</CustomLink>
                ):(
                    <CustomLink to="/registration">{text['Sign up'][language]}</CustomLink>
                )
            }
            {us ? (
                    <li className=""><Link to="/"  onClick={()=>{
                        localStorage.removeItem('user');
                        setAuth(false);
                        setUser(null);
                        //navigate('/about');
                        console.log('SIGNED OUT')
                    }}>{text['Sign out'][language]}</Link></li>
                
                ) : (
                    <CustomLink to="/login">{text['Sign in'][language]}</CustomLink>
                )}
        </ul>
        <img src={en_img} onClick={()=>{
            localStorage.setItem('language', JSON.stringify('en'));
            console.log(window.location.href.slice(21))
            navigate(window.location.href.slice(21))
        }} className="langlogo"></img>
        <img src={ru_img} onClick={()=>{
            localStorage.setItem('language', JSON.stringify('ru'));
            navigate(window.location.href.slice(21))
        }} className="langlogo"></img>
    </nav>
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end:true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to}>{children}</Link>
        </li>
    )

}