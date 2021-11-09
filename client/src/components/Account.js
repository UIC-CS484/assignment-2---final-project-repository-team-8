import React from "react";
import NavBar from "./NavBar";


class Account extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="account__container">
			<NavBar />
		</div>;
	}
}

export default Account;