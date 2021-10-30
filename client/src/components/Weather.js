import React from "react";
import NavBar from "./NavBar";
import ReactWeather, { useOpenWeather } from 'react-open-weather';

export default function Weather() {
	const { data, isLoading, errorMessage } = useOpenWeather({
        key: '',
        lat: '48.137154',
        lon: '11.576124',
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });

	return (
		<div className="weather__container">
            <NavBar />
            <h1>Damm its hot in here :fire:</h1>

            <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel="Munich"
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
            {/* https://openweathermap.org/api/weather-map-2 */}
            {/* https://www.npmjs.com/package/react-open-weather */}
            {/* https://rapidapi.com/community/api/open-weather-map/ */}
        </div>
	);
}