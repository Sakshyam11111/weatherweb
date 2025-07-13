import React, { useState } from 'react';
import axios from 'axios';
import Weather from './Weather';

const WeatherApp = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const API_KEY = 'c33f21b2c16843689c303559cbaccfb5';
    const getUrl = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(getUrl(location))
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching weather data:', error);
                });
            setLocation('');
        }
    };

    return (
        <div className="w-full h-full relative">
            <div className="text-center p-4">
                <input
                    type="text"
                    className="py-3 px-6 w-[700px] text-lg rounded-3xl border border-gray-200 text-gray-600 placeholder:text-gray-400 focus:outline-none bg-white/10 shadow-md"
                    placeholder="Enter location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyDown={searchLocation}
                />
            </div>
            <Weather weatherData={data} />
        </div>
    );
};

export default WeatherApp;