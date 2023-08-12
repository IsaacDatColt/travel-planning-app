import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/calendar">Calendar</Link>
            {/* Add more links as needed */}
        </nav>
    );
};

export default NavBar;
