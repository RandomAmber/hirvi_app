import React, {useState, useEffect} from 'react';
import './styles.css';
import { getDatabase, ref, child, get } from "firebase/database";
import { useNavigate} from "react-router-dom";
import AuthProvider, {useAuth} from './AuthProvider';


function LoginForm() {
    
    let navigate = useNavigate();
    const dbRef = ref(getDatabase());
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

    const handleSubmit = () =>{
        let obj = {
                email:email,
                password:password,
            }   
        get(child(dbRef, `users/${email}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                if (snapshot.val().password==password){
                    localStorage.setItem('user', email);
                    //const k = localStorage.getItem('user')
                    //console.log(k + 'signed in')
                    setAuth(true)
                    setUser(email)
                    console.log(user + 'signed in')
                    navigate('/dashboard')
                }
                else {
                alert('Wrong password.')
                }
            } else {
            console.log("No data available");
            alert('There is no user with this email. Try again or sign up.')
            }
        }).catch((error) => {
            console.error(error);
        });
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
            </div>
        </div>
        
    )       
}

export default LoginForm
