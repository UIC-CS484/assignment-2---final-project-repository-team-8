import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { routes } from "../Common";
// import Geocode from "react-geocode";

export const GetLocation = () => {

    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    const [api, setApi] = useState("");

    // Get the weather api
    React.useEffect(() => {
        axios.get(routes.GET_API_KEY).then((res) => {
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

    return {...position, api, error};
  }

  export default GetLocation