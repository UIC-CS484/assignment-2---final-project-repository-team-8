const routes = {
	REGISTER: "/account/register",
	LOGIN: "/account/login",
	ACCOUNT: "/account"
};

const errors = {
    NAME: "Please provide a name",
	EMAIL: "Please provide an email",
	PASSWORD: "Please provide an password"
}

module.exports.errors = errors;
module.exports.routes = routes;