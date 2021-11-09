const messages = {
	BAD_REQUEST: "Please send a properly-formed request!",
	UNEXPECTED_ERROR: "Unexpected error. Please try again!",
	USER_NOT_FOUND: "User not found...",
	EMAIL_ALREADY_EXISTS: "Email already exists!",
	INCORRECT_PASSWORD: "Passwords do not match!",
	REGISTRATION_FAILED: "Unable to register user. Please try again!",
	REGISTRATION_SUCCEEDED: "Successfully registered the account!",
	TWEET_SUBMITTED: "Successfully submitted a tweet!",
	TWEET_FAILURE: "Unable to submit tweet!",
	LOGIN_FAILED: "Login failed!",
	LOGIN_SUCCEEDED: "Successfully authenticated the login!",
	BAD_PASSWORD_FORMAT: "Passwords need at least one uppercase letter, one lowercase letter, and one number",
	BAD_EMAIL_FORMAT: "Please provide a valid email",
	BAD_REGISTRATION_PARAMETERS: "Please provide a name, email, and password"
};

const errors = {
	USER_NOT_FOUND: new Error(messages.USER_NOT_FOUND),
	INCORRECT_PASSWORD: new Error(messages.INCORRECT_PASSWORD)
};

const query = {
	GET_ACCOUNT: "SELECT * from user WHERE email = ?",
	GET_EMAIL: "SELECT email from user WHERE email = ?",


	GET_TWEETS: "SELECT user.email, name, tweet, timestamp from tweets join user on tweets.email = user.email WHERE user.email = ? ORDER BY timestamp DESC",
	GET_ALL_TWEETS: "SELECT user.email, name, tweet, timestamp from tweets join user on tweets.email = user.email ORDER BY timestamp DESC LIMIT 50",


	GET_PASSWORD: "SELECT password from user WHERE email = ?",
	INSERT_ACCOUNT: "INSERT INTO user (name, email, password) VALUES (?,?,?)",
	INSERT_TWEET: "INSERT INTO tweets (email, tweet, timestamp) VALUES (?,?,?)",
	CREATE_USER_TABLE: "CREATE TABLE IF NOT EXISTS user (email text PRIMARY KEY UNIQUE, password text, name text, CONSTRAINT email_unique UNIQUE (email))",
	CREATE_TWEETS_TABLE: "CREATE TABLE IF NOT EXISTS tweets (email text, tweet text, timestamp integer)"
};

const routes = {
	REGISTER: "/account/register",
	LOGIN: "/account/login",
	TWEET: "/tweet",
	TWEETS_FROM_USER: "/tweets/user/:email",
	GET_ALL_TWEETS: "/tweets/all",
	GET_WEATHER_API_KEY: "/api/weather",
};

const SECRET = "Hello, world!";

module.exports.SECRET = SECRET;
module.exports.routes = routes;
module.exports.query = query;
module.exports.errors = errors;
module.exports.messages = messages;