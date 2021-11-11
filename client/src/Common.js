const routes = {
	REGISTER: "/account/register",
	LOGIN: "/account/login",
	TWEET: "/tweet",
	TWEETS_FROM_USER: "/tweets/user/",
	GET_ALL_TWEETS: "/tweets/all",
	GET_WEATHER_API_KEY: "/api/weather",
	UPDATE_PASSWORD: "/account/update",
	REMOVE_ACCOUNT: "/account/remove"
	SPOTIFY_AUTH: "/spotify/auth",
	SPOTIFY_LOGIN: "/spotify/login",
	SPOTIFY_LYRICS: "/spotify/lyrics"
};

const errors = {
	NAME: "Please provide a name",
	EMAIL: "Please provide an email",
	PASSWORD: "Please provide an password",
	WEATHER: "Please provide a valid city or address",
	CURRENT_PASSWORD: "Please provide your current password",
	NEW_PASSWORD: "Please provide a new password",
	CURRENT_PASSWORD_AGAIN: "Please re-enter your current password again",
	PASSWORD_NO_MATCH: "Passwords do not match",
	PASSWORD_UPDATE_SAME: "Cannot update the password to current password"
};

const constants = {
	EMAIL: "email",
	NAME: "name",
	TOKEN: "token",
	SECRET: "Hello, world!",
	EMPTY: ""
};

module.exports.constants = constants;
module.exports.errors = errors;
module.exports.routes = routes;