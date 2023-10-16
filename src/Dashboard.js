import AuthProvider, {useAuth} from './AuthProvider';
import { Route, Routes, Navigate, Outlet } from "react-router-dom"

function Dashboard() {

    const redirectPath = '/about'

    let user = localStorage.getItem('user')
    if (user=='null'){
        user = null
    }

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }
    return <h1>Welcome, {user}</h1>
}

export default Dashboard;