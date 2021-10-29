import React from "react";
import NavBar from "./NavBar";
import { constants } from "../Common";

class Profile extends React.Component {
	render() {
		const name = localStorage.getItem(constants.NAME);
		return <div>
			<NavBar />
			Hello {name}
		</div>;
	}
}

export default Profile;