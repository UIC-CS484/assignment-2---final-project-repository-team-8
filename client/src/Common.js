const routes = {
	REGISTER: "/account/register",
	LOGIN: "/account/login",
	ACCOUNT: "/account",
	TWEET: "/tweet"
};

const errors = {
	NAME: "Please provide a name",
	EMAIL: "Please provide an email",
	PASSWORD: "Please provide an password"
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