import React from "react";
import "./style/Home.scss";
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
			<div className="home__container">
				<NavBar />

				<div className={"home__header"}>
					<h1> Welcome to Pwitter! </h1>
				</div>

				<Form onSubmit={ev => { ev.preventDefault(); }}>
					<div className={"home__form"}>
						<textarea class="tweet" onChange={e => this.tweet = e.target.value} placeholder="What would you like to say today?" />
					</div>

					<div className={"home__tweetBtn"}>
						<Button onClick={submitTweet} block size="sm" type="submit">pweet</Button>
					</div>

					<TweetColumn tweets={this.tweets} />
				</Form>
			</div>
		);
	}
}

export default Home;