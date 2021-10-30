import React from "react";

const Tweet = ({ data }) => {
	const date = new Date(data.timestamp).toDateString();
	return (
		<>
			<ul>
				<li>
					{data.name} on {date}:
				</li>
				<li>
					<b> {data.tweet}</b>
				</li>
			</ul>

		</>
	);
};

export default Tweet;