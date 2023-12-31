import React, {useState, useEffect} from 'react';
import './css/Login.css';
import { useNavigate} from "react-router-dom";
import {getData} from './utiles.js';
import texts from "./text.json";


function LoginForm() {
    
    let navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [passwordIsCorrect, setpasswordIsCorrect] = useState(null)
    const [userExist, setUserExist] = useState(null);

    let language = localStorage.getItem('language');
    language = language ? language : 'en';
    language = JSON.parse(language)

    let text = texts['Login']

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
        if(email && password){
            getData("http://127.0.0.1:8000/users/"+email).then(
                function(response) {
                    if('password' in response){
                        console.log(response)
                        // add user check isnt null
                        if (response["password"] == password){
                            localStorage.setItem('user', email);
                            setpasswordIsCorrect(true)
                            navigate('/dashboard')
                        }
                        else {
                            setpasswordIsCorrect(false)
                        }
                    setUserExist(true)
                    }
                    else {
                        setUserExist(false)
                    }
                },
                function(error) {console.log(error)}
            );
        }
    }

    return(
        <div className='form-container'>
        <div className="form">
            <div className="body-form">
                <p className='header'>{text["login"][language]}</p>
                <div className="login-form-email">
                    {
                        (userExist==false) ? <p className='validation'>This email hasn't been registrated yet.</p> : ''
                    }
                    {
                        (passwordIsCorrect==false) ? <p className='validation'>Password isn't correct, you can restore it.</p> : ''
                    }
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
            </div>
            <div class="buttons-1">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">{text["login"][language]}</button>
                <button onClick={()=>{navigate("/registration")}} className="btn">{text["signup"][language]}</button>
            </div>
            <div class="buttons-2">
                <p>
                {text["passwordreminder"][language]}
                    <a src='#' onClick={()=>handleRestore()} type="submit" className="link">{text["restore"][language]}</a>
                </p>
            </div>
        </div>
        </div>
        
    )       
}

export default LoginForm
