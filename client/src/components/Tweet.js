import React from "react";
import { Link } from "react-router-dom";

const Tweet = ({ data }) => {
	const date = new Date(data.timestamp).toDateString();
	return (
		<>
			<ul>
				<li>
					<Link to={"/profile/" + data.email}>{data.name}</Link> on {date}:
				</li>
				<li>
					<b> {data.tweet}</b>
				</li>
			</ul>

		</>
	);
};

export default Tweet;