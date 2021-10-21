import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import "./login.scss";
import axios from "axios";
import { ToastsContainer, ToastsContainerPosition, ToastsStore } from "react-toasts";
import { routes, errors } from "./Common";

export default function Register() {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [name, setName] = useState("");
	const history = useHistory();
	const data = {
		email: email,
		password: pwd,
		name: name
	};

	const registerNewUser = () => {
		if (email === "") {
			ToastsStore.error(errors.EMAIL);
			return
		} else if (pwd === "") {
			ToastsStore.error(errors.PASSWORD);
			return
		} else if (name === "") {
			ToastsStore.error(errors.NAME);
			return
		}

		axios.post(routes.REGISTER, data)
			.then((res) => {
				history.push("/login");
			}).catch((error) => {
			ToastsStore.error(error.response.data.error);
		});
	};


	return (
		<div className="register">
			<ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
			<Form onSubmit={ev => {
				ev.preventDefault();
			}}>
				<div className="redirect">
					<Link to={"/login"}>Login</Link>
				</div>
				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Label>Name</Form.Label>
					<Form.Control onChange={e => setName(e.target.value)} type="name" placeholder="Enter name" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control onChange={e => setPwd(e.target.value)} type="password" placeholder="Password" />
				</Form.Group>

				<Button onClick={registerNewUser} block size="lg" type="submit">
					Register
				</Button>
			</Form>
		</div>
	);
}