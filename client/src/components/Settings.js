import React, { useState } from "react";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { constants, errors, routes } from "../Common";
import { useHistory } from "react-router-dom";
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from "react-toasts";
import "./style/Login.scss";

export default function Settings() {
	const [curPwd, setCurPwd] = useState("");
	const [newPwd, setNewPwd] = useState("");
	const history = useHistory();

	const updatePassword = () => {
		if (curPwd === constants.EMPTY) {
			ToastsStore.error(errors.CURRENT_PASSWORD);
			return;
		} else if (newPwd === constants.EMPTY) {
			ToastsStore.error(errors.NEW_PASSWORD);
			return;
		}else if (newPwd === curPwd) {
			ToastsStore.error(errors.PASSWORD_UPDATE_SAME);
			return;
		}

		const data = {
			email: localStorage.getItem(constants.EMAIL),
			password: curPwd,
			newPassword: newPwd
		};
		const token = localStorage.getItem(constants.TOKEN);

		axios.post(routes.UPDATE_PASSWORD, data, { headers: { "Authorization": `Bearer ${token}` } })
			.then((res) => {
				ToastsStore.success(res.data.message);
			}).catch((error) => {
			ToastsStore.error(error.response.data.error);
		});

	};

	const [enterPwd, setEnterPwd] = useState("");
	const [confirmPwd, setConfirmPwd] = useState("");

	const removeAccount = () => {
		if (enterPwd === constants.EMPTY) {
			ToastsStore.error(errors.CURRENT_PASSWORD);
			return;
		} else if (confirmPwd === constants.EMPTY) {
			ToastsStore.error(errors.CURRENT_PASSWORD_AGAIN);
			return;
		} 
		// else if (enterPwd != confirmPwd) {
		// 	ToastsStore.error(errors.PASSWORD_NO_MATCH);
		// 	return;
		// }

		const data = {
			email: localStorage.getItem(constants.EMAIL),
			name: localStorage.getItem(constants.NAME),
			password: enterPwd,
			confirmPassword: confirmPwd
		};

		const token = localStorage.getItem(constants.TOKEN);

		if (window.confirm("You sure you want to delete your account?")) {
			axios.post(routes.REMOVE_ACCOUNT, data, { headers: { "Authorization": `Bearer ${token}` } })
				.then((res) => {
					localStorage.clear();
					history.push("/login");
				}).catch((error) => {
				ToastsStore.error(error.response.data.error);
			});
		}
	};

	return (
		<div className="login">
			<ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
			<NavBar />
			<div className={"account__header"}>
				<h1> Account Management </h1>
			</div>
			<br/>
			<Form onSubmit={ev => {
				ev.preventDefault();
			}}>
				<div className="UpdatePwd">
					Update Password
					<Form.Group className="mb-3" controlId="formCurPassword">
						<Form.Control onChange={e => setCurPwd(e.target.value)} type="password" placeholder="Enter Current Password" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formNewPassword">
						<Form.Control onChange={e => setNewPwd(e.target.value)} type="password" placeholder="Enter New Password" />
					</Form.Group>
					<button onClick={updatePassword} type="button" className="btn btn-primary btn-lg">Update</button>
				</div>
				<br/>
				<div className="DeleteAcct">
					Delete Account
					<Form.Group className="mb-3" controlId="formPassword">
						<Form.Control onChange={e => setEnterPwd(e.target.value)} type="password" placeholder="Enter Password" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formConfirmPassword">
						<Form.Control onChange={e => setConfirmPwd(e.target.value)} type="password" placeholder="Confirm Password" />
					</Form.Group>
					<button onClick={removeAccount} type="button" className="btn btn-primary btn-lg">Submit</button>
				</div>
			</Form>
		</div>
	)
}