import React, { useState } from 'react';
import {loginUser} from '../../apicalls/user';
import { useHistory } from 'react-router-dom';
import './Login.css'
import { setToken } from '../../apicalls/todo';

const Login = ({setUser}) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory();
    const handleSubmit = () => {
        loginUser({username,password})
        .then(user => {
          console.log(user.token)
          //setToken(user.token); 
          setUser({username});

          window.localStorage.setItem('user',user)
          window.localStorage.setItem('token',user.token)
        })
        history.push('/')
    }

    return(
        <div className="signin">
        <div className="card">
             <h2 className="card-header">
                Welcome Back
            </h2>
            <div className="card-content">
                <div className = "card-content-div">
                  <label>Username</label>
                  <input 
                  className ="card-input"
                   type="email"
                   value = {username}
                   onChange = {(event)=>setUsername(event.target.value)}
                   />
                </div>
                <div className = "card-content-div">
                  <label>Password</label>
                  <input 
                  className ="card-input" 
                  type="password"
                  value = {password}
                  onChange = {(event)=>setPassword(event.target.value)}
                  />
                </div>
                <div className="card-content-div">
                  <button 
                    onClick = {handleSubmit}
                  className = "card-btn">Signin</button>
                </div>
                {/* <div className="card-footer">
                <p>No Account ? <strong> <Link className="signup-text" to="/signup">Signup</Link></strong></p>
                </div> */}
            </div>

        </div>
    </div>
    )
}
export default Login;