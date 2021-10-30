import React from "react";
import { Link } from "react-router-dom";
import "./style/Tweet.scss";

const Tweet = ({ data }) => {
	const date = new Date(data.timestamp).toDateString();
	return (
		<div className={"tweet__container"}>
			<Link to={"/profile/" + data.email}>{data.name}</Link> on {date}:
			<br />
			<b> {data.tweet}</b>
		</div>
	);
};

export default Tweet;