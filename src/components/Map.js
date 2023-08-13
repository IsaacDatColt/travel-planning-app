/* global google */
import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const Map = ({ center: initialCenter, zoom: initialZoom }) => {
    const [center] = useState(initialCenter);
    const [zoom] = useState(initialZoom || 10);
    const [directions, setDirections] = useState(null);
    const [travelTime, setTravelTime] = useState({});
    const startInputRef = useRef(null);
    const endInputRef = useRef(null);
    const googleMapRef = useRef(null);

    const API_KEY = 'AIzaSyCMQmoeZXYLyymmoxqXQeQDfPBk0gs03fk';

    useEffect(() => {
        const initAutocomplete = () => {
            if (window.google && window.google.maps && window.google.maps.places) {
                new google.maps.places.Autocomplete(startInputRef.current);
                new google.maps.places.Autocomplete(endInputRef.current);

                if (directions && googleMapRef.current) {
                    const directionsRenderer = new google.maps.DirectionsRenderer();
                    directionsRenderer.setMap(googleMapRef.current.map_);
                    directionsRenderer.setDirections(directions);
                }
            }
        };

        const timeoutId = setTimeout(initAutocomplete, 1000);

        return () => clearTimeout(timeoutId);
    }, [directions]);

    const reset = () => {
        setDirections(null);
        setTravelTime({});
    };

    const getDirections = (travelMode) => {
        if (!window.google || !window.google.maps || !window.google.maps.DirectionsService) return;

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: startInputRef.current.value,
                destination: endInputRef.current.value,
                travelMode,
            },
            (response, status) => {
                if (status === 'OK') {
                    setDirections(response);
                    const duration = response.routes[0].legs[0].duration.text;
                    setTravelTime((prevTime) => ({ ...prevTime, [travelMode]: duration }));
                } else {
                    console.error(`Error fetching directions: ${status}`);
                }
            }
        );
    };

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <input ref={startInputRef} type="text" placeholder="Start location" />
            <input ref={endInputRef} type="text" placeholder="End location" />
            <button onClick={() => getDirections('DRIVING')}>Get Driving Directions</button>
            <button onClick={() => getDirections('TRANSIT')}>Get Transit Directions</button>
            <button onClick={() => getDirections('WALKING')}>Get Walking Directions</button>
            <button onClick={() => getDirections('BICYCLING')}>Get Bicycling Directions</button>
            <button onClick={reset}>Reset</button>
            <div>
                {travelTime.DRIVING && <p>Driving Time: {travelTime.DRIVING}</p>}
                {travelTime.TRANSIT && <p>Transit Time: {travelTime.TRANSIT}</p>}
                {travelTime.WALKING && <p>Walking Time: {travelTime.WALKING}</p>}
                {travelTime.BICYCLING && <p>Bicycling Time: {travelTime.BICYCLING}</p>}
            </div>
            <GoogleMapReact
                ref={googleMapRef}
                bootstrapURLKeys={{ key: API_KEY, libraries: ['places'] }}
                center={center}
                zoom={zoom}
            >
                {/* You can add markers and other components here */}
            </GoogleMapReact>
        </div>
    );
};

Map.defaultProps = {
    center: {
        lat: 37.7749,
        lng: -122.4194,
    },
};

export default Map;
