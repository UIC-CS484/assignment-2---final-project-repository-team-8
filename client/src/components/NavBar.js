import { useHistory } from "react-router-dom";
import React from "react";
import { constants } from "../Common";
import "./NavBar.scss";

export default function NavBar() {

	const history = useHistory();
	const handleLogout = () => {
		localStorage.clear();
		history.push("/login");
	};

	const goToProfile = () => {
		history.push("/profile/" + localStorage.getItem(constants.EMAIL));
	};

	const goToHome = () => {
		history.push("/home");
	};

	return <div className={"navbar__container"}>
		<button onClick={goToHome}>Home</button>
		<button onClick={goToProfile}>Profile</button>
		<button onClick={handleLogout}>Logout</button>
	</div>;
}


