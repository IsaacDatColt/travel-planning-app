import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../dashboard.css';
import WeatherWidget from './WeatherWidget';
import '../App.css';



const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="dashboard">
            <header>
                <h1>Trip Planner</h1>
                <nav>
                    <Link to="/profile">Profile</Link>
                    <Link to="/">Log out</Link>
                </nav>
            </header>

            <div className="columns">
                <div className="column is-one-quarter">
                    <WeatherWidget />
                </div>

                <div className="column">
                    <main>
                        <h2>Welcome back, {user.username}! Ready for your next adventure?</h2>

                        {/* Google Maps integration goes here */}

                        <section className="upcoming-trips">
                            {/* Placeholder for upcoming trips */}
                        </section>

                        <div>
                            <Link to="/new-trip">Plan a New Trip</Link>
                        </div>
                        <div>
                            <Link to="/calendar">View My Calendar</Link>
                        </div>

                        <footer>
                        </footer>
                    </main>
                </div>

                <div className="column is-one-quarter">
                    {/* AttractionsList goes here */}
                </div>
            </div>

            {/* Sidebar - Might be removed or adjusted based on new layout */}
            <aside>
                <Link to="/my-trips">My Trips</Link>
                <Link to="/settings">Settings</Link>
            </aside>
        </div>
    );
};

export default Dashboard;
