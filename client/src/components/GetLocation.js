import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { routes } from "../Common";
import Geocode from "react-geocode";
import ReactWeather, { useOpenWeather } from 'react-open-weather';

export default class GetLocation extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className={"tweet-column__container"}>
			{this.props.tweets.map(function(obj) {
				return <div><ReactWeather
                forecast="5days"
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel = {location}
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast/></div>;
			})}
		</div>;
	}
}
     export default GetLocation;