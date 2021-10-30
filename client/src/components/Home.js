import React from "react";
import "./login.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { constants, routes } from "../Common";
import { ToastsStore } from "react-toasts";
import NavBar from "./NavBar";
import Tweet from "./Tweet";

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
					// TODO: put this tweet into the user's feed on homepage
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

					<div>
						{this.tweets.map(function(obj, index) {
							return <div><Tweet data={obj} /> <br /></div>;
						})}
					</div>
				</Form>
			</div>
		);
	}
}

export default Home;