const sqlite3 = require("sqlite3").verbose();
// race condition: bad!
const dbname = process.env.NODE_ENV === "test" ? "db" : "db-test";

let db = new sqlite3.Database(dbname, (err) => {
	if (err) {
		console.error(err.message);
		throw err;
	} else {
		console.log("Connected to the SQLite database.");
		db.run(`CREATE TABLE IF NOT EXISTS user (             
            email text PRIMARY KEY UNIQUE, 
            password text, 
            name text,
            CONSTRAINT email_unique UNIQUE (email)
            )`
		);
	}
});

module.exports.db = db;
module.exports.dbname = dbname;