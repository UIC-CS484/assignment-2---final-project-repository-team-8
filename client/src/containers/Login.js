import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../css/login.scss";
import axios from "axios";


export default function Login() {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");

	const login = () => {
		const data = {
			email: email,
			password: pwd
		};
		axios.post("/account/login", data)
			.then((res) => {
				console.log(res);
			}).catch((error) => {
			console.log(error);
			console.log(error.body);
		});
	};

	return (
		<div className="login">
			<Link to={"/register"}>Register</Link>
			<Form onSubmit ={ev =>{ev.preventDefault()}}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control onChange={e => setPwd(e.target.value)} type="password" placeholder="Password" />
				</Form.Group>

				<Button onClick={login} block size="lg" type="login" >
					Login
				</Button>

			</Form>
		</div>
	);
}