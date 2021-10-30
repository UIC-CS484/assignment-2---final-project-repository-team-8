import React from "react";
import "./style/Home.scss";
import NavBar from "./NavBar";

class Weather extends React.Component {

	render() {
		return (
			<div className="weather__container">
				<NavBar />
                <h1>Damm its hot in here :fire:</h1>
			</div>
		);
	}
}

export default Weather;