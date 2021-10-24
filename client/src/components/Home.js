import React, { useState } from "react";
import "./login.scss";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default function Home() {
	const history = useHistory();
	const [tweet, setTweet] = useState("");

	const handleLogout = () => {
		localStorage.clear();
		history.push("/login");
	};

	const submitTweet = () => {
		console.log(tweet);
	};

	return (
		<div className="home">
			Congrats! You logged in!!
			<br />
			<button onClick={handleLogout}>logout</button>
			<Form onSubmit={ev => {
				ev.preventDefault();
			}}>
				<div className="redirect">
					<Link to={"/login"}>Login</Link>
				</div>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Tweet</Form.Label>
					<Form.Control onChange={e => setTweet(e.target.value)} placeholder="Tweet" />
				</Form.Group>

				<Button onClick={submitTweet} block size="sm" type="submit">
					Tweet
				</Button>
			</Form>
		</div>
	);
}