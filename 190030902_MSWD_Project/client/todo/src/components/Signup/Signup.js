import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {registerUser} from '../../apicalls/user'
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState();
    const [username, setUsername] = useState("");


    const history = useHistory();

    const handleSubmit = () => {
        registerUser({name,username,email,password,age})
        .then(user=>{
          console.log(user);
          history.push('/login');
        })

        setName("")
        setEmail("")
        setPassword("")
        setAge("")
        setUsername("")
    }

    return (
        <div className="signup">
        {/* {MessageHandler()} */}
        {/* {errorMessage()}
        {successMessage()} */}
        <div className="card">
             <h2 className="card-header">
                Welcome
            </h2>
            <div className="card-content">
            <div className = "card-content-div">
                  <label>Name</label>
                  <input onChange = {(event)=>setName(event.target.value)} 
                    className ="card-input"
                    type="text"
                    value = {name}
                    />
                </div>
                <div className="card-content-div">
                  <label>Username</label>
                  <input onChange = {(event)=>setUsername(event.target.value)} 
                    className ="card-input"
                    type="text"
                    value = {username}
                    />
                </div>
            
                <div className="card-content-div">
                  <label>Age</label>
                  <input 
                  onChange = {(event)=>setAge(event.target.value)} 
                  className ="card-input"
                  type="number"
                  value = {age}
                  />
                </div>
                <div className = "card-content-div">
                  <label>Email</label>
                  <input 
                  onChange = {(event)=>setEmail(event.target.value)} 
                  className ="card-input"
                  type="email"
                  value = {email}
                  />
                </div>
                <div className = "card-content-div">
                  <label>Password</label>
                  <input 
                  onChange = {(event)=>setPassword(event.target.value)} 
                  className ="card-input"
                  type="password"
                  value = {password}
                  />
                </div>
                <div className="card-content-div">
                  <button onClick={handleSubmit} className = "card-btn">Sign up</button>
                </div>
                <div className="card-footer">
                <p>Already Registered ? <strong> <Link className="signin-text" to="/login">Signin</Link></strong></p>
                </div>
            </div>

        </div>
    </div>
    )
}

export default Signup;
