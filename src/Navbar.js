import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useNavigate, useLocation} from "react-router-dom";
import logo from "./logo.png";
import texts from "./text.json";

export default function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    let language = localStorage.getItem('language');
    language = language ? language : 'en';
    language = JSON.parse(language)

    let text = texts['Navbar']

    //const user = localStorage.getItem('user');

    let user = localStorage.getItem('user');

    console.log('navbar auth'+user)
    
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
        <button onClick={()=>{
            localStorage.setItem('language', JSON.stringify('en'));
            console.log(location.pathname)
            navigate(location.pathname)
        }} className="langlogo">English</button>
        <button onClick={()=>{
            localStorage.setItem('language', JSON.stringify('ru'));
            navigate(location.pathname)
        }} className="langlogo">Русский</button>
        <ul>
        <button onClick={
            ()=>{
                console.log('function')
            document.getElementById("myDropdown").classList.toggle("show");
            console.log(document.getElementById("myDropdown").classList)
        }
        } class="dropbtn">{text['Games'][language]}</button>
            <div id="myDropdown" class="dropdown-content">
                <a href="/games/numbers">Numbers</a>
                <a href="/games/hangman">Hangman</a>
                <a href="/games/alchemy">Alchemy</a>
                <a href="/games/affixes">Affixes</a>
            </div>
            <CustomLink to="/lessons">{text['Lessons'][language]}</CustomLink>
            <CustomLink to="/">{text['Home'][language]}</CustomLink>
            {
                user ? (
                    <CustomLink to="/dashboard">{text['Dashboard'][language]}</CustomLink>
                ):''
            }
            {user ? (
                    <li className=""><Link to="/"  onClick={()=>{
                        localStorage.removeItem('user');
                        navigate('/');
                        console.log('SIGNED OUT')
                    }}>{text['Sign out'][language]}</Link></li>
                
                ) : (
                    <CustomLink to="/login">{text['Sign in'][language]}</CustomLink>
                )}
        </ul>
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