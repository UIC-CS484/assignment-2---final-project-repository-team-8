const { messages } = require("../common");
const PASSWORD_FORMAT = require("../common").PASSWORD_FORMAT;

function validPasswordFormat(password) {
	const passwordIsPresent = !!password;
	const passwordIsValid = PASSWORD_FORMAT.test(password);

	if (!passwordIsPresent) {
		return [false, messages.BAD_PASSWORD_FORMAT];
	} else if (!passwordIsValid) {
		return [false, messages.BAD_PASSWORD_FORMAT];
	}

	return [true, null];
}

module.exports = validPasswordFormat;