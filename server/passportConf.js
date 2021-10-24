const bcrypt = require("bcrypt");
const db = require("./database.js").db;
const { errors, query, SECRET } = require("./common");
const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;
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

	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = SECRET;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		db.get(query.GET_ACCOUNT, jwt_payload.user, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}));

	passport.serializeUser((user, done) => {
		done(null, user.email);
	});
	passport.deserializeUser((email, done) => {
		db.get(query.GET_EMAIL, email, function(err, user) {
			done(err, user);
		});
	});
};