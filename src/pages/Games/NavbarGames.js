import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';

export default function Navbar() {



    return <sidebar className="nav-games">
        <ul>
            <CustomLink to="/games/hangman">Hangman</CustomLink>
            <CustomLink to="/games/numbers">Numbers</CustomLink>
            <CustomLink to="/games/numbers2">Numbers 2</CustomLink>
            <CustomLink to="/games/alchemy">Alchemy</CustomLink>
            <CustomLink to="/games/train">Train of thoughts</CustomLink>
        </ul>
    </sidebar>
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