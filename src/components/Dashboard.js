import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../dashboard.css';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="dashboard">
            {/* Header */}
            <header>
                <h1>Trip Planner</h1>
                <nav>
                    <Link to="/profile">Profile</Link>
                    <Link to="/">Log out</Link>
                </nav>
            </header>

            {/* Main Content */}
            <main>
                <h2>Welcome back, {user.username}! Ready for your next adventure?</h2>

                <section className="upcoming-trips">
                    {/* Placeholder for upcoming trips */}
                </section>

                <div>
                    <Link to="/new-trip">Plan a New Trip</Link>
                </div>
                <div>
                    <Link to="/calendar">View My Calendar</Link>
                </div>
            </main>

            {/* Sidebar */}
            <aside>
                <Link to="/my-trips">My Trips</Link>
                <Link to="/settings">Settings</Link>
            </aside>

            { }
            <footer>
                {/* <p>&copy; 2023 Trip Planner. All rights reserved.</p> */}
            </footer>
        </div>
    );
};

export default Dashboard;
