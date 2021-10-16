const sqlite3 = require("sqlite3").verbose();
const query = require("./query");
const dbname = process.env.NODE_ENV === "test" ? "db-test.sqlite" : "db.sqlite";

let db = new sqlite3.Database(dbname, (err) => {
	if (err) {
		console.error(err.message);
		throw err;
	} else {
		console.log("Connected to the SQLite database.");
		db.run(query.CREATE_USER_TABLE);
	}
});

module.exports.db = db;