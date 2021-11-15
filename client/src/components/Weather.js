import React, {useState, useEffect} from 'react';
import NavBar from "./NavBar";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { routes } from "../Common";
import axios from 'axios';
import Button from "react-bootstrap/Button";

export default function Weather() {

    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    const [api, setApi] = useState("");

    // Get the weather api
    React.useEffect(() => {
        axios.get(routes.GET_WEATHER_API_KEY).then((res) => {
            setApi(res.data);
        });
    }, []);
    
    const onChange = ({coords}) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    };  
    
    const onError = (error) => {
        setError(error.message);
    };

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }    
        
        const watcher = geo.watchPosition(onChange, onError);    
        return () => geo.clearWatch(watcher);

    }, []); 

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: api,
        lat: position.latitude,
        lon: position.longitude,
        lang: 'en',
        unit: 'metric'
    });

    const weatherBtn = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }

	return (
		<div className="weather__container">
            <NavBar />
            <br/>

            <div className={"home__tweetBtn"}>
                <Button onClick={weatherBtn} block size="sm" type="login">Show Weather</Button> <br />
            </div>

            <ReactWeather
                forecast="5days"
                isLoading={isLoading}
                errorMessage={error}
                data={data}
                lang="en"
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
            
        </div>
	);
}