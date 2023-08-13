import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';


const WeatherWidget = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [city, setCity] = useState('San Diego');
    const [suggestions, setSuggestions] = useState([]);
    const API_KEY = '8376b81f04b21fb3c8cc35d74bf471af';

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.log('Error fetching weather data:', error);
            }
        };

        const fetchForecastData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
                );
                setForecastData(response.data);
            } catch (error) {
                console.log('Error fetching forecast data:', error);
            }
        };

        fetchWeatherData();
        fetchForecastData();

        const interval = setInterval(fetchWeatherData, 600000);

        return () => {
            clearInterval(interval);
        };
    }, [city]);

    const handleCityChange = (event, { newValue }) => {
        setCity(newValue);
    };

    const handleSuggestionsFetchRequested = ({ value }) => {
        const API_ENDPOINT = `https://api.teleport.org/api/cities/?search=${value}`;
        axios
            .get(API_ENDPOINT)
            .then((response) => {
                const cities = response.data._embedded['city:search-results'];
                const suggestions = cities.map((cityData) => {
                    const cityName = cityData.matching_full_name;
                    return cityName;
                });
                setSuggestions(suggestions);
            })
            .catch((error) => {
                console.log('Error fetching city suggestions:', error);
            });
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => {
        return suggestion;
    };

    const renderSuggestion = (suggestion) => {
        return <span>{suggestion}</span>;
    };

    const inputProps = {
        placeholder: 'Enter city name',
        value: city,
        onChange: handleCityChange,
    };

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const celsiusToFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };

    return (
        <div className="weatherCard">
            <div className="weatherWidget">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={handleSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <div className="currentDay">
                    <img className="weatherIcon" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
                    <h2 className="weatherHeading">{weatherData.name}</h2>
                    <p className="weatherDescription">{weatherData.weather[0].description}</p>
                    <p className="weatherTemp">Temperature: {celsiusToFahrenheit(weatherData.main.temp).toFixed(1)} °F</p>
                    <p className="weatherInfo">Humidity: {weatherData.main.humidity} %</p>
                </div>
                <div className="forecastContainer">
                    {forecastData && forecastData.list.slice(0, 5).map((day, index) => (
                        <div className="forecastDay" key={index}>
                            <h3>{new Date(day.dt_txt).toLocaleDateString()}</h3>
                            <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt={day.weather[0].description} />
                            <p>Temperature: {celsiusToFahrenheit(day.main.temp).toFixed(1)} °F</p>
                            <p>Humidity: {day.main.humidity} %</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};
export default WeatherWidget;