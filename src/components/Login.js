import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/login', formData);
            console.log(response.data);
        } catch (error) {
            console.error("Login error", error.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;