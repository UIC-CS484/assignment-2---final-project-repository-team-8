const bcrypt = require("bcrypt");
const db = require("./database.js").db;
const {errors, query} = require("./common");

const localStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
	passport.use(new localStrategy({
			usernameField: "email",
			passwordField: "password"
		}, (email, password, done) => {
			db.get(query.GET_ACCOUNT, email, function(err, row) {
				if (err) {
					throw err;
				} else if (!row) {
					done(errors.USER_NOT_FOUND, false);
				} else {
					if (bcrypt.compareSync(password, row.password)) {
						done(null, row);
					} else {
						done(errors.INCORRECT_PASSWORD, false);
					}
				}
			});
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.email);
	});
	passport.deserializeUser((email, done) => {
		db.get(query.GET_EMAIL, email, function(err, user) {
			done(err, user);
		});
	});
};