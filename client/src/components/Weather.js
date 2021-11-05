import React, {useState, useEffect} from 'react';
import NavBar from "./NavBar";
import GetLocation from "./GetLocation";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { routes } from "../Common";
import axios from 'axios';
import Geocode from "react-geocode";
import ReactWeather, { useOpenWeather } from 'react-open-weather';

export default function Weather() {

    const [googleApi, setGoogleApi] = useState("");
    const [weatherApi, setWeatherApi] = useState("");
    const [position, setPosition] = useState({});

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

    Geocode.setApiKey(googleApi);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");

    // Get latitude & longitude from address.
    Geocode.fromAddress("chicago").then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setPosition({
            latitude: lat,
            longitude: lng,
        });
    },
    (error) => {
        console.error(error);
    });

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: weatherApi, 
        lat: position.latitude, 
        lon: position.longitude, 
        lang: 'en', 
        unit: 'metric'
    });

    const weatherBtn = (namer) => {
        console.log(namer);
    }
    
	return (
		<div className="weather__container">
            <NavBar />
            
            <Form onSubmit={ev => { ev.preventDefault(); }}>
                <div className={"home__form"}>
                    <Form.Label>Please enter your current location</Form.Label>
                    <Form.Control onChange={e => console.log("didsome")} type="city" placeholder="eg. Chicago" />
                </div>
			</Form>
            <Button onClick={weatherBtn} block size="lg" type="login">
				yay
			</Button>

            <ReactWeather
                forecast="5days"
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel = {"location"}
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
        </div>
	);
}