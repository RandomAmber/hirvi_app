import React, {useState} from 'react';
import './styles.css'
import { useNavigate } from "react-router-dom";


function RegistrationForm() {
    
    let navigate = useNavigate();

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

    const [passwordValid, setPasswordValid] = useState(null);
    const [passwordIsntNull, setPasswordIsntNull] = useState(null)
    const [emailValid, setEmailValid] = useState(null);
    const [emailIsntNull, setEmailIsntNull] = useState(null);
    const [emailNotUsed, setEmailNotUsed] = useState(null);
    const [nameIsntNull, setNameIsntNull] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "name"){
            setName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    // Example POST method implementation:
    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }




    const handleSubmit = () =>{
        
        let obj = {
                email:email,
                password:password,
                name:name,
        }
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email){
            setEmailIsntNull(true)
            if (email.match(validRegex)){
                setEmailValid(true)
            }
            else{
                setEmailValid(false)
            }
        } else {
            setEmailIsntNull(false)
        }
        if(password){
            setPasswordIsntNull(true)
            if (password==confirmPassword){
                setPasswordValid(true)
            }
            else{
                setPasswordValid(false)
            }
        } else {
            setPasswordIsntNull(false)
        }
        if (name){
            setNameIsntNull(true)
        }
        else{
            setNameIsntNull(false)
        }

        if (emailIsntNull && emailValid && nameIsntNull && passwordValid && passwordIsntNull){
            postData("http://127.0.0.1:8000/users/", obj).then(
                function(response){
                    if (response['status'] == 200){
                        postData("http://127.0.0.1:8000/send_email", 
                        {email: email, password:password, name: name}
                        ).then((data) => {console.log(data);});
                        navigate("/login");
                    }
                    else{
                        setEmailNotUsed(false)
                    }
                },function(error) {console.log(error)}
            );
        }
    }

    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    {
                        (nameIsntNull==false) ? <p className='wrong-email'>Type your name</p> : ''
                    }
                    <label className="form__label" for="name">Name </label>
                    <input className="form__input" type="text" value={name} onChange = {(e) => handleInputChange(e)} id="name" placeholder="Name"/>
                </div>
                <div className="email">
                    {
                        (emailValid==false) ? <p className='wrong-email'>Email isn't correct</p> : ''
                    }
                    {
                        (emailIsntNull==false) ? <p className='wrong-email'>Set your email</p> : ''
                    }
                    {
                        (emailNotUsed==false) ? <p className='wrong-email'>This email has been used</p> : ''
                    }
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    {
                        (passwordIsntNull==false) ? <p className='wrong-password'>Set a password</p> : ''
                    }
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    {
                        (passwordValid==false) ? <p className='wrong-password'>Password and Confirm password aren't the same</p> : ''
                    }
                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div class="register-div">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Register</button>
            </div>
        </div>
        
    )       
}

export default RegistrationForm
