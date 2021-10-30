import React, { useState } from "react";
import "./login.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { constants, routes } from "../Common";
import { ToastsStore } from "react-toasts";
import NavBar from "./NavBar";


export default function Home() {
	const [tweet, setTweet] = useState("");

	const submitTweet = () => {
		const token = localStorage.getItem(constants.TOKEN);
		const data = {
			tweet
		};
		axios.post(routes.TWEET, data, { headers: { "Authorization": `Bearer ${token}` } })
			.then((res) => {
				// TODO: put this tweet into the user's feed on homepage
				console.log(res);
			}).catch((error) => {
			console.log(error);
			ToastsStore.error(error.response.data.error);
		});
	};

	const getTweetsFromWill = () => {
		const token = localStorage.getItem(constants.TOKEN);
		axios.get(routes.TWEETS_FROM_USER + "will@uic.edu", { headers: { "Authorization": `Bearer ${token}` } })
			.then((res) => {
				console.log(res);
			}).catch((error) => {
			console.log(error);
			ToastsStore.error(error.response.data.error);
		});
	};

	const getAllTweets = () => {
		const token = localStorage.getItem(constants.TOKEN);
		axios.get(routes.GET_ALL_TWEETS, { headers: { "Authorization": `Bearer ${token}` } })
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

				<Button onClick={getTweetsFromWill} block size="sm" type="submit">
					Get will's tweets
				</Button>

				<Button onClick={getAllTweets} block size="sm" type="submit">
					Get all tweets
				</Button>
			</Form>
		</div>
	);
}