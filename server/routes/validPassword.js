const { messages } = require("../common");
const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{5,}$/;


function validPasswordFormat(password) {
	const passwordIsPresent = !!password;
	const passwordIsValid = PASSWORD_FORMAT.test(password);

	if (!passwordIsPresent) {
		return [false, messages.BAD_REGISTRATION_PARAMETERS];
	} else if (!passwordIsValid) {
		return [false, messages.BAD_EMAIL_FORMAT];
	}

	return [true, null];
}

module.exports = validPasswordFormat;