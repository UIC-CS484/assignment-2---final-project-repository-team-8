import React, { useState } from "react";
import NavBar from "./NavBar";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import GetLocation from "./GetLocation";
import Form from "react-bootstrap/Form";

export default function Weather() {

    const [city, setCity] = useState("");

    const {latitude, longitude, api, error} = GetLocation();

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: api,
        lat: latitude,
        lon: longitude,
        lang: 'en',
        unit: 'metric'
    });
    
	return (
		<div className="weather__container">
            <NavBar />
            
            <Form onSubmit={ev => { ev.preventDefault(); }}>
                <div className={"home__form"}>
                    <Form.Label>Please enter your current location</Form.Label>
                    <Form.Control onChange={e => setCity(e.target.value)} type="city" placeholder="eg. Chicago" />
                </div>
			</Form>

            <ReactWeather
                forecast="5days"
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel = {city}
                unitsLabels={{ temperature: 'F', windSpeed: 'Km/h' }}
                showForecast
            />
            
        </div>
	);
}