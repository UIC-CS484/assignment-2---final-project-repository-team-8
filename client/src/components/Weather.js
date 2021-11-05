import React, {useState, useEffect} from 'react';
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Geocode from "react-geocode";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { constants, errors, routes } from "../Common";
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from "react-toasts";

export default function Weather() {

    const [googleApi, setGoogleApi] = useState("");
    const [weatherApi, setWeatherApi] = useState("");
    const [position, setPosition] = useState({});
    const [city, setCity] = useState("");

    // Get google weather api
    React.useEffect(() => {
        axios.get(routes.GET_GOOGLE_API_KEY).then((res) => {
            setGoogleApi(res.data);
        });
    }, []);

    // Get open weather api
    React.useEffect(() => {
        axios.get(routes.GET_WEATHER_API_KEY).then((res) => {
            setWeatherApi(res.data);
        });
    }, []);

    
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: weatherApi, 
        lat: position.latitude, 
        lon: position.longitude, 
        lang: 'en', 
        unit: 'metric'
    });

    const weatherBtn = () => {
        if (city === constants.EMPTY) {
			ToastsStore.error(errors.EMAIL);
			return;
		} 

        Geocode.setApiKey(googleApi);
        Geocode.setLanguage("en");
        Geocode.setLocationType("ROOFTOP");

        // Get latitude & longitude from address.
        Geocode.fromAddress(city).then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            setPosition({
                latitude: lat,
                longitude: lng,
            });
        },
        (error) => {
            ToastsStore.error(error);
        });
    }
    
	return (
		<div className="weather__container">
            <NavBar />
            
            <Form onSubmit={ev => { ev.preventDefault(); }}>
                <div className={"home__form"}>
                    <Form.Label>Please enter your current location</Form.Label>
                    <Form.Control onChange={e => setCity(e.target.value)} type="city" placeholder="eg. Chicago" />
                </div>
			</Form>
            <div className={"home__tweetBtn"}>
                <Button onClick={weatherBtn} block size="sm" type="login">Get Weather</Button> <br /><br />
            </div>

            <ReactWeather
                forecast="5days"
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel = {city}
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
        </div>
	);
}