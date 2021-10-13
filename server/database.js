var sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("db.sqlite", (err) => {
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

module.exports = db;