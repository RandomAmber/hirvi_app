import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useNavigate} from "react-router-dom";
import {useAuth} from './AuthProvider';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Navbar() {

    const {setAuth, auth, setUser, user} = useAuth();
    const navigate = useNavigate();

    //const user = localStorage.getItem('user');

    let us = localStorage.getItem('user');

    if (us=='null'){
      us = null
    }
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
        <Link to='/' className="site-title">Site Name</Link>
        <ul>
        <button onClick={
            ()=>{
                console.log('function')
            document.getElementById("myDropdown").classList.toggle("show");
        }
        } class="dropbtn">Games</button>
            <div id="myDropdown" class="dropdown-content">
                <a href="/games/numbers">Numbers</a>
                <a href="/games/hangman">Hangman</a>
                <a href="/games/alchemy">Alchemy</a>
            </div>
            <CustomLink to="/grammar">Grammar</CustomLink>
            <CustomLink to="/">Home</CustomLink>
            {
                us ? (
                    <CustomLink to="/dashboard">Dashboard</CustomLink>
                ):(
                    <CustomLink to="/registration">Sign up</CustomLink>
                )
            }
            {us ? (
                    <li className=""><Link to="/"  onClick={()=>{
                        localStorage.setItem('user', JSON.stringify(null));
                        setAuth(false);
                        setUser(null);
                        //navigate('/about');
                        console.log('SIGNED OUT')
                    }}>Sign out</Link></li>
                
                ) : (
                    <CustomLink to="/login">Sign in</CustomLink>
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