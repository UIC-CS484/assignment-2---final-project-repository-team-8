import React from "react";

const Tweet = ({ data }) => {
	const date = new Date(data.timestamp).toDateString();
	console.log(date);
	return (
		<>
			<ul>
				<li>
					{data.email} on {date}:
				</li>
				<li>
					<b> {data.tweet}</b>
				</li>
			</ul>

		</>
	);
};

export default Tweet;