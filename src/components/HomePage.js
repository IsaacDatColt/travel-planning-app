import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to Trip Planner!</h1>
            <p>Plan your trips, view your itinerary, and much more.</p>
            <div>
                <Link to="/login">Login</Link>
                <span> or </span>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default HomePage;
