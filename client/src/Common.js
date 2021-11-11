const routes = {
	REGISTER: "/account/register",
	LOGIN: "/account/login",
	TWEET: "/tweet",
	TWEETS_FROM_USER: "/tweets/user/",
	GET_ALL_TWEETS: "/tweets/all",
	GET_WEATHER_API_KEY: "/api/weather",
	SPOTIFY_AUTH: "/spotify/auth",
	SPOTIFY_TOKEN: "/spotify/token"
};

const errors = {
	NAME: "Please provide a name",
	EMAIL: "Please provide an email",
	PASSWORD: "Please provide an password",
	WEATHER: "Please provide a valid city or address"
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