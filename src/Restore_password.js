import React, {useState} from 'react';
import './styles.css';
import { useNavigate} from "react-router-dom";
import {getData, postData} from './utiles.js';


function Restore() {
    
    let navigate = useNavigate();
    const [email, setEmail] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
    } 

    const handleSubmit = () =>{
        getData("http://127.0.0.1:8000/users/"+email).then(
            function(response) {
                if (response){
                    postData("http://127.0.0.1:8000/send_restore_email", 
                            {email: email, password: response["password"], name: response["name"]}
                            ).then((data) => {console.log(data);});

                    navigate('/login')
                }
                else {
                alert("You haven't been registered yet.")
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
            </div>
            <div class="button-login">
                <button onClick={()=>handleSubmit()} type="submit" class="btn">Send email</button>
            </div>
        </div>
        
    )       
}

export default Restore
