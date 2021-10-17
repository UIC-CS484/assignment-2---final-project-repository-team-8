const messages = {
	BAD_REQUEST: "Please send a properly-formed request!",
	UNEXPECTED_ERROR: "Unexpected error. Please try again!",
	USER_NOT_FOUND: "User not found...",
	EMAIL_ALREADY_EXISTS: "Email already exists!",
	INCORRECT_PASSWORD: "Passwords do not match!",
	REGISTRATION_FAILED: "Unable to register user. Please try again!",
	REGISTRATION_SUCCEEDED: "Successfully registered the account!",
	LOGIN_FAILED: "Login failed!",
	LOGIN_SUCCEEDED: "Successfully authenticated the login!",
	BAD_PASSWORD_FORMAT: "Passwords need at least one uppercase letter, one lowercase letter, and one number",
	BAD_EMAIL_FORMAT: "Please provide a valid email",
	BAD_REGISTRATION_PARAMETERS: "Please provide a name, email, and password"
};

module.exports.messages = messages;