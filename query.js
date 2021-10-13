const QUERY = {
	GET_ACCOUNT: "SELECT * from user WHERE email = ?",
	GET_EMAIL: "SELECT email from user WHERE email = ?",
	GET_PASSWORD: "SELECT password from user WHERE email = ?",
	INSERT_ACCOUNT: "INSERT INTO user (name, email, password) VALUES (?,?,?)"
};

module.exports = QUERY;