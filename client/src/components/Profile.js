import React from "react";
import NavBar from "./NavBar";
import { ToastsStore } from "react-toasts";
import axios from "axios";
import { constants, routes } from "../Common";
import TweetColumn from "./TweetColumn";
import "./style/Profile.scss";

class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.email = this.props.match.params.user;
		this.tweets = [];
	}

	componentDidMount() {
		const token = localStorage.getItem(constants.TOKEN);
		axios.get(routes.TWEETS_FROM_USER + this.email, { headers: { "Authorization": `Bearer ${token}` } })
			.then((res) => {
				this.tweets = res.data;
				this.forceUpdate();
			}).catch((error) => {
			ToastsStore.error(error.response.data.error);
		});
	}

	render() {

		if (this.email !== this.props.match.params.user) {
			this.email = this.props.match.params.user;
			this.componentDidMount();
		}

		return <div>
			<NavBar />
			<div className={"profile__name-header"}>
				{this.email}'s profile
			</div>
			<TweetColumn tweets={this.tweets} />
		</div>;
	}
}

export default Profile;