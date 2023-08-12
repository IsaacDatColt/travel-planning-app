import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import CalendarPage from './components/CalendarPage';
import Dashboard from './components/Dashboard.js';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
