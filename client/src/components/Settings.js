import React, { useState } from "react";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { constants, errors, routes } from "../Common";
import { ToastsStore } from "react-toasts";

export default function Settings() {
	const token = localStorage.getItem(constants.TOKEN);
	const [curPwd, setCurPwd] = useState("");
	const [newPwd, setNewPwd] = useState("");

	const updatePassword = () => {
		if (curPwd === constants.EMPTY) {
			ToastsStore.error(errors.CURPWD);
			return;
		} else if (newPwd === constants.EMPTY) {
			ToastsStore.error(errors.NEWPWD);
			return;
		}

		const data = {
			email: localStorage.getItem(constants.EMAIL),
			currentPassword: curPwd,
			newPassword: newPwd,
			name: localStorage.getItem(constants.NAME)
		};
		axios.post(routes.UPDATE_PWD, data, { headers: { "Authorization": `Bearer ${token}` } })
			.then((res) => {
				ToastsStore.success("It worked lul");
			}).catch((error) => {
			console.log(error);
			ToastsStore.error(error.response.data.error);
		});

	};

	return <div className="account__container">
		<NavBar />
		<div className={"account__header"}>
			<h1> Account Management </h1>
		</div>
		<div className="UpdatePwd">
			Update Password
			<Form.Group className="mb-3" controlId="formCurPassword">
				<Form.Control onChange={e => setCurPwd(e.target.value)} type="password"
							  placeholder="Enter Current Password" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="formNewPassword">
				<Form.Control onChange={e => setNewPwd(e.target.value)} type="password"
							  placeholder="Enter New Password" />
			</Form.Group>
			<button onClick={updatePassword} type="button" className="btn btn-primary btn-lg">Update</button>
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