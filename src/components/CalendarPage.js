import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = (start, end) => {
        fetch(`http://localhost:8000/trips/dateRange?start=${start}&end=${end}`)
            .then((res) => res.json())
            .then((data) => {
                const events = data.trips.map((trip) => ({
                    title: trip.title,
                    start: new Date(trip.startDate),
                    end: new Date(trip.endDate),
                }));
                setEvents(events);
            });
    };

    useEffect(() => {
        fetchEvents('2023-09-01', '2023-09-30');
    }, []);

    const handleEventClick = (event) => {
        // Logic to handle click, like opening a modal or navigating to a different page
    };

    return (
        <div>
            <h1>My Trips Calendar</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleEventClick}
            />
        </div>
    );
};

export default CalendarPage;
