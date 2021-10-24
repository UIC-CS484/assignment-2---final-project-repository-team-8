const routes = {
	REGISTER: "/account/register",
	LOGIN: "/account/login",
	ACCOUNT: "/account"
};

const errors = {
	NAME: "Please provide a name",
	EMAIL: "Please provide an email",
	PASSWORD: "Please provide an password"
};

const constants = {
	TOKEN: "token",
	SECRET: "Hello, world!",
	EMPTY: ""
};

module.exports.constants = constants;
module.exports.errors = errors;
module.exports.routes = routes;