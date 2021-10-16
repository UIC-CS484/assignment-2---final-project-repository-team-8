const messages = require("./message").messages;

const errors = {
	USER_NOT_FOUND: new Error(messages.USER_NOT_FOUND),
	INCORRECT_PASSWORD: new Error(messages.INCORRECT_PASSWORD)
};

module.exports.errors = errors;