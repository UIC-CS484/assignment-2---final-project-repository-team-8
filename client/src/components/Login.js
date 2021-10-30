import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { constants, errors, routes } from "../Common";
import "./style/Login.scss";
import axios from "axios";
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from "react-toasts";

export default function Login() {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const history = useHistory();

	const login = () => {
		if (email === constants.EMPTY) {
			ToastsStore.error(errors.EMAIL);
			return;
		} else if (pwd === constants.EMPTY) {
			ToastsStore.error(errors.PASSWORD);
			return;
		}

		const data = {
			email: email,
			password: pwd
		};

		axios.post(routes.LOGIN, data)
			.then((res) => {
				localStorage.setItem(constants.EMAIL, data.email);
				localStorage.setItem(constants.NAME, res.data.name);
				localStorage.setItem(constants.TOKEN, res.data.token);
				history.push("/home");
			}).catch((error) => {
			ToastsStore.error(error.response.data.error);
		});
	};

	return (
		<div className="login">
			<ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
			<Form onSubmit={ev => {
				ev.preventDefault();
			}}>
				<div className="redirect">
					<Link to={"/register"}>Register</Link>
				</div>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control onChange={e => setPwd(e.target.value)} type="password" placeholder="Password" />
				</Form.Group>

				<Button onClick={login} block size="lg" type="login">
					Login
				</Button>

			</Form>
		</div>
	);
}