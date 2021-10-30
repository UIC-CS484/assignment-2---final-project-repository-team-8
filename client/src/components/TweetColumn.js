import React from "react";
import "./TweetColumn.scss";
import Tweet from "./Tweet";

export default class TweetColumn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className={"tweet-column__container"}>
			{this.props.tweets.map(function(obj) {
				return <div><Tweet data={obj} /> <br /></div>;
			})}
		</div>;
	}
}