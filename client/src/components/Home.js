import React, { useState } from "react";
import "./login.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { constants } from "../Common";
import { ToastsStore } from "react-toasts";
import NavBar from "./NavBar";


export default function Home() {
	const [tweet, setTweet] = useState("");

	const submitTweet = () => {
		const token = localStorage.getItem(constants.TOKEN);
		// TODO: replace this with a post to /tweet, then remove /protected-hello
		axios.get("/protected-hello", { headers: { "Authorization": `Bearer ${token}` } })
			.then((res) => {
				console.log(res);
			}).catch((error) => {
			console.log(error);
			ToastsStore.error(error.response.data.error);
		});
	};

	return (
		<div className="home">
			<NavBar />
			<Form onSubmit={ev => {
				ev.preventDefault();
			}}>

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