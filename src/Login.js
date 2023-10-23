import React, {useState, useEffect} from 'react';
import './styles.css';
import { useNavigate} from "react-router-dom";
import AuthProvider, {useAuth} from './AuthProvider';
import {getData} from './utiles.js';


function LoginForm() {
    
    let navigate = useNavigate();
    const { auth, setAuth, user, setUser } = useAuth();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    const handleRestore = () => {
        navigate('/login/restore_password')
    }

    const handleSubmit = () =>{
        let obj = {
                email:email,
                password:password,
            }
        //let response = getData("http://127.0.0.1:8000/users/"+email)
        getData("http://127.0.0.1:8000/users/"+email).then(
            function(response) {
                console.log(response)
                if (response["password"] == password){
                    localStorage.setItem('user', email);
                    setAuth(true)
                    setUser(email)
                    console.log(user + 'signed in')
                    navigate('/dashboard')
                }
                else {
                alert('Wrong password.')
                }},
            function(error) {console.log(error)}
          );
    }

    return(
        <div className="form">
            <div className="form-body">
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
            </div>
            <div class="button-login">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Login</button>
                <button onClick={()=>handleRestore()} type="submit" class="btn">Restore password</button>
            </div>
        </div>
        
    )       
}

export default LoginForm
