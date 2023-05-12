import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value; 
        console.log(email, password);
        
    }   

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        setEmail(event.target.value);
    } 

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    }

    return (
        <div>
           <h1> Please Register</h1> 
           <form onSubmit={handleSubmit}>
            <input onChange={handleEmailChange} type='email' name='email' id='email' placeholder='your email'></input>
            <br />
            <input onBlur={handlePasswordBlur} type='password' name='password' id='password' placeholder='your password'></input>
            <br />
            <input type='submit' value='Register'></input>
           </form>
        </div>
    );
};

export default Register;