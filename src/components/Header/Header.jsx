import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/register-rbs">Register React-BS</Link>
            <Link to="/register-bs">Register Bootstrap</Link>
          
        </nav>
    );
};

export default Header;