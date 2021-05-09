import React, { useState } from 'react';
import "../css/signin.css";
import logo from "../img/Amazon logo - sign.png";
import {Link, useHistory} from "react-router-dom";
import { auth } from '../config/config';


function SignIn() {
    const history =useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

     const signIn = e => {
          e.preventDefault( );
          auth.signInWithEmailAndPassword(email, password)
          .then((auth) => {
                  history.push('/')
              }
          )
          .catch(error=> alert(error.message))
     };

     const register = e =>{
         e.preventDefault();
         
         auth.createUserWithEmailAndPassword(email,password)
         .then((auth) =>{
             if(auth){
                 history.push('/')
             }
         })
         .catch(error=> alert(error.message))
     };

    return (
        <div className="signin">
        <Link to="/">
            <img className="signin_logo" src={logo} alt ="logo"/>
        </Link>
        <div className="signin_container">
            <h1>Sign-In</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={
                    e => setEmail(e.target.value)
                }></input>
                <h5>Password</h5>
                <input type="password" value={password} onChange={
                    e => setPassword(e.target.value)
                }></input>
                <button type="submit" className="signin_sign" onClick={signIn}>Sign In</button>
            </form>
            <p>
                By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
            <button className="signin_register" onClick={register} >Create Your Amazon Account</button>
        </div>
        </div>
    )
}

export default SignIn
