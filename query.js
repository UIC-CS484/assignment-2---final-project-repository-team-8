const QUERY = {
	GET_ACCOUNT: "SELECT * from user WHERE email = ?",
	INSERT_ACCOUNT: "INSERT INTO user (name, email, password) VALUES (?,?,?)"
};

module.exports = QUERY;