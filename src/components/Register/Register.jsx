import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        // prvent page refresh
        event.preventDefault();
         setError('');
         setSuccess('');
        // collect form data
        const email = event.target.email.value;
        const password = event.target.password.value; 
        console.log(email, password);

        // validate password
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Password must contain at least one uppercase letter');
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Password must contain at least two digits');
            return;
        }
        else if(password.length < 8){
            setError('Password must be at least 8 characters long');
            return;
        }

        // create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            event.target.reset();
            setSuccess('User has been created successfully');
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
            setSuccess('');
        })
        
    }   
    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value);
    } 

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }

    return (
        <div className='w-50 mx-auto'>
           <h1 className='text-danger'>Please Register</h1> 
           <form onSubmit={handleSubmit}>
            <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type='email' name='email' id='email' placeholder='your email' required></input>
            <br />
            <input className='w-50 mb-4 rounded ps-2' onBlur={handlePasswordBlur} type='password' name='password' id='password' placeholder='your password' required></input>
            <br />
            <input className='btn btn-primary' type='submit' value='Register'></input>
           </form>
           <p><small>Already have an account? Please <Link to="/login">Login</Link></small></p>
           <p className='text-danger'>{error}</p>
           <p>{success}</p>
        </div>
    );
};

export default Register;