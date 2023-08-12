import React, { useState } from 'react';
import axios from 'axios';

const NewTrip = () => {
    const [trip, setTrip] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrip((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://your-api-endpoint/trips', trip);

            if (response.status === 201) {
                console.log('Trip created successfully!');
            } else {
                console.error('Error while creating trip');
            }
        } catch (error) {
            console.error('There was an error submitting the trip', error);
        }
    };

    return (
        <div>
            <h1>Create a New Trip</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Destination:
                    <input type="text" name="destination" value={trip.destination} onChange={handleChange} />
                </label>
                <label>
                    Start Date:
                    <input type="date" name="startDate" value={trip.startDate} onChange={handleChange} />
                </label>
                <label>
                    End Date:
                    <input type="date" name="endDate" value={trip.endDate} onChange={handleChange} />
                </label>
                <label>
                    Notes:
                    <textarea name="notes" value={trip.notes} onChange={handleChange} />
                </label>
                <button type="submit">Create Trip</button>
            </form>
        </div>
    );
};

export default NewTrip;
