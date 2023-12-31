import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
            const response = await axios.post('http://localhost:8000/users/register', formData);
            console.log(response.data);

            // Redirect to login page if registration was successful
            if (response.data.user) {
                navigate('/login'); // Redirect to login page
            }
        } catch (error) {
            console.error("Registration error", error.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
