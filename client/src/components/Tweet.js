import React from "react";
import { Link } from "react-router-dom";
import "./style/Tweet.scss";

const Tweet = ({ data }) => {
	const date = new Date(data.timestamp).toDateString();
	return (
		<div className={"pweet__container"}>
			<Link to={"/profile/" + data.email}>{data.name}</Link> on {date}:
			<br />
			<div className="pweet__user"><b> {data.tweet}</b></div>
		</div>
	);
};

export default Tweet;