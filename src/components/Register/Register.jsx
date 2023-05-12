import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

const Register = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        // prvent page refresh
        event.preventDefault();
        // collect form data
        const email = event.target.email.value;
        const password = event.target.password.value; 
        console.log(email, password);
        // create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error => {
            console.error(error);
        })
        
    }   
    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        setEmail(event.target.value);
    } 

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }

    return (
        <div className='w-50 mx-auto'>
           <h1 className='text-danger'>Please Register</h1> 
           <form onSubmit={handleSubmit}>
            <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type='email' name='email' id='email' placeholder='your email'></input>
            <br />
            <input className='w-50 mb-4 rounded ps-2' onBlur={handlePasswordBlur} type='password' name='password' id='password' placeholder='your password'></input>
            <br />
            <input className='btn btn-primary' type='submit' value='Register'></input>
           </form>
        </div>
    );
};

export default Register;