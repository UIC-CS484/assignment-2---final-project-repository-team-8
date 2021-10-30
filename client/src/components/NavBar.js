import { useHistory } from "react-router-dom";
import React from "react";
import { constants } from "../Common";
import "./style/NavBar.scss";

export default function NavBar() {

	const history = useHistory();
	
	const goToHome = () => {
		history.push("/home");
	};

	const goToProfile = () => {
		history.push("/profile/" + localStorage.getItem(constants.EMAIL));
	};

	const goToWeather = () => {
		history.push("/weather");
	};

	const handleLogout = () => {
		if(window.confirm('You sure you want to logout?')){
			localStorage.clear();
			history.push("/login");
		}
	};

	return <div className={"navbar__container"}>
		<button class="navbar__container__button" onClick={goToHome}>Home</button>
		<button class="navbar__container__button" onClick={goToProfile}>Profile</button>
		<button class="navbar__container__button" onClick={goToWeather}>Weather</button>
		<button class="navbar__container__button" onClick={handleLogout}>Logout</button>
	</div>;
}


