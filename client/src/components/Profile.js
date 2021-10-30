import React from "react";
import NavBar from "./NavBar";
import Tweet from "./Tweet";
import { ToastsStore } from "react-toasts";
import axios from "axios";
import { constants, routes } from "../Common";


class Profile extends React.Component {

	constructor() {
		super();
		this.tweets = [];
	}

	componentDidMount() {
		const token = localStorage.getItem(constants.TOKEN);
		axios.get(routes.TWEETS_FROM_USER + localStorage.getItem(constants.EMAIL), { headers: { "Authorization": `Bearer ${token}` } })
			.then((res) => {
				this.tweets = res.data;
				console.log(res.data);
				this.forceUpdate();
			}).catch((error) => {
			console.log(error);
			ToastsStore.error(error.response.data.error);
		});
	}

	render() {

		const getAllTweets = () => {
			const token = localStorage.getItem(constants.TOKEN);
			axios.get(routes.GET_ALL_TWEETS, { headers: { "Authorization": `Bearer ${token}` } })
				.then((res) => {
					console.log(res.data.rows);
				}).catch((error) => {
				console.log(error);
				ToastsStore.error(error.response.data.error);
			});
		};

		const getTweetsFromWill = () => {
			const token = localStorage.getItem(constants.TOKEN);
			axios.get(routes.TWEETS_FROM_USER + "will@uic.edu", { headers: { "Authorization": `Bearer ${token}` } })
				.then((res) => {
					console.log(res.data);
				}).catch((error) => {
				console.log(error);
				ToastsStore.error(error.response.data.error);
			});
		};

		return <div>
			<NavBar />
			Hello {localStorage.getItem(constants.NAME)}
			{this.tweets.map(function(obj, index) {
				return <div><Tweet data={obj} /> <br /></div>;
			})}
			<button onClick={getAllTweets} type="submit">
				Get all tweets
			</button>

			<button onClick={getTweetsFromWill} type="submit">
				Get all tweets
			</button>
		</div>;
	}
}

export default Profile;