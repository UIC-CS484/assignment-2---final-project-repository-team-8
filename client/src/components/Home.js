import React from "react";
import "./style/login.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { constants, routes } from "../Common";
import { ToastsStore } from "react-toasts";
import NavBar from "./NavBar";
import TweetColumn from "./TweetColumn";

class Home extends React.Component {
	constructor() {
		super();
		this.tweet = "";
		this.tweets = [];
		this.state = "hello";
	}

	componentWillMount() {
		const token = localStorage.getItem(constants.TOKEN);
		axios.get(routes.GET_ALL_TWEETS, { headers: { "Authorization": `Bearer ${token}` } })
			.then((res) => {
				this.tweets = res.data;
				this.forceUpdate();
			}).catch((error) => {
			ToastsStore.error(error.response.data.error);
		});
	}

	render() {
		const submitTweet = () => {
			const token = localStorage.getItem(constants.TOKEN);
			const data = {
				tweet: this.tweet
			};
			axios.post(routes.TWEET, data, { headers: { "Authorization": `Bearer ${token}` } })
				.then((res) => {
					const tt = {
						name: localStorage.getItem(constants.NAME),
						email: localStorage.getItem(constants.EMAIL),
						tweet: this.tweet,
						timestamp: new Date().toDateString()
					};
					this.tweets.unshift(tt);
					this.forceUpdate();
				}).catch((error) => {
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
						<Form.Control onChange={e => this.tweet = e.target.value} placeholder="Tweet" />
					</Form.Group>

					<Button onClick={submitTweet} block size="sm" type="submit">
						Tweet
					</Button>


					<TweetColumn tweets={this.tweets} />
				</Form>
			</div>
		);
	}
}

export default Home;