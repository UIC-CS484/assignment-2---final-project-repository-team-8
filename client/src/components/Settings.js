import React from "react";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";

class Account extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="account__container">
			<NavBar />
			<div className={"account__header"}>
				<h1> Account Management </h1>
			</div>
			<div className="UpdatePwd">
				Update Password
				<Form.Group className="mb-3" controlId="formCurPassword">
					<Form.Control type="password" placeholder="Enter Current Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formNewPassword">
					<Form.Control type="password" placeholder="Enter New Password" />
				</Form.Group>
				<button type="button" className="btn btn-primary btn-lg">Update</button>
			</div>
			<div className="DeleteAcct">
				Delete Account
				<Form.Group className="mb-3" controlId="formPassword">
					<Form.Control type="password" placeholder="Enter Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formConfirmPassword">
					<Form.Control type="password" placeholder="Confirm Password" />
				</Form.Group>
				<button type="button" className="btn btn-primary btn-lg">Submit</button>
			</div>
		</div>;
	}
}

export default Account;