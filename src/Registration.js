import React, {useState} from 'react';
import './styles.css'
import {database} from './firebase'
import {ref,push,child,update} from "firebase/database";
import { useNavigate } from "react-router-dom";


function RegistrationForm() {
    
    let navigate = useNavigate();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
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

    const { spawn } = require('child_process');

    // Run a Python script and return output
    function runPythonScript(scriptPath, args) {

        // Use child_process.spawn method from 
        // child_process module and assign it to variable
        const pyProg = spawn('python', [scriptPath].concat(args));

        // Collect data from script and print to console
        let data = '';
        pyProg.stdout.on('data', (stdout) => {
            data += stdout.toString();
        });

        // Print errors to console, if any
        pyProg.stderr.on('data', (stderr) => {
            console.log(`stderr: ${stderr}`);
        });

        // When script is finished, print collected data
        pyProg.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            console.log(data);
        });
    }


    const handleSubmit = () =>{
        let obj = {
                firstName : firstName,
                lastName:lastName,
                email:email,
                password:password,
                confirmPassword:confirmPassword,
            }
        if (password==confirmPassword)  {   
            const newPostKey = push(child(ref(database), 'posts')).key;
            const updates = {};
            updates['users/' + email] = obj;
            update(ref(database), updates);
            runPythonScript("./scripts/registration_mail.py", ["strakovskaya.am@gmail.com"]);
            navigate("/login");
        }
        else{
            alert('Password isnt the same. try again.')
        }
    }

    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">First Name </label>
                    <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                </div>
                <div className="lastname">
                    <label className="form__label" for="lastName">Last Name </label>
                    <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Register</button>
            </div>
        </div>
        
    )       
}

export default RegistrationForm
