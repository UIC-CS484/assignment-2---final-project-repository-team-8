import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../css/login.scss";
import axios from "axios";

export default function Register() {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [name, setName] = useState("");

	const registerNewUser = () => {
		const details = {
			email: email,
			password: pwd,
			name: name
		};
		axios.post("/account/register", details)
			.then((res) => {
				console.log(res);
			}).catch((error) => {
			console.log(error);
		});
	};


	return (
		<div className="register">
			<Link to={"/login"}>Login</Link>
			<Form>
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