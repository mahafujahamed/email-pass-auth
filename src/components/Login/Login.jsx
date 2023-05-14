import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef('');

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // validation
        setError('');
        setSuccess('');

        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Password must contain at least one uppercase letter');
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('Password must contain at least two digits');
            return;
        }
        else if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Password must contain at least one special character');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                setSuccess('User has been logged in successfully');
                setError('');
                form.reset();

            })
            .catch(error => {
                setError(error.message);
            })
    }

    const handleResetPassword = (event) => {
     const email = emailRef.current.value;
     if(!email){
        alert('Please provide your email address');
        return;
     }
     sendPasswordResetEmail(auth, email)
        .then(result => {
            alert('A password reset email has been sent to your email address. Please check your email');
        }
        )
        .catch(error => {
            console.log(error);
            setError(error.message);
        }
        )

    }

    return (
        <div className='w-25 mx-auto'>
            <h1>Please Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' ref={emailRef} className="form-control mb-4" id="email" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control mb-4" id="password" placeholder="Password" required />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input mb-4" id="remember-me" />
                    <label className="form-check-label" htmlFor="remember-me">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset</button></small></p>
            <p><small>New to this Website? Please <Link to="/register">Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;