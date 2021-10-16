const QUERY = {
	GET_ACCOUNT: "SELECT * from user WHERE email = ?",
	GET_EMAIL: "SELECT email from user WHERE email = ?",
	GET_PASSWORD: "SELECT password from user WHERE email = ?",
	INSERT_ACCOUNT: "INSERT INTO user (name, email, password) VALUES (?,?,?)",
	CREATE_USER_TABLE: "CREATE TABLE IF NOT EXISTS user (email text PRIMARY KEY UNIQUE, password text, name text, CONSTRAINT email_unique UNIQUE (email))"
};

module.exports = QUERY;