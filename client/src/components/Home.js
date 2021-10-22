import React from "react";
import "./login.scss";
import { Link, useHistory } from "react-router-dom";


export default function Home() {
	const history = useHistory();

	const handleLogout = () => {
		localStorage.clear();
		history.push("/login");
	}

	return (
		<div className="home">
			Congrats! You logged in!!
			<br/>
			<button onClick={handleLogout}>logout</button>
		</div>
	);
}