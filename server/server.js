const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const passport = require("passport");
const StatusCodes = require("http-status-codes").StatusCodes;
const validRegistrationParameters = require("./routes/registration");
const validPasswordFormat = require("./routes/validPassword");
const { messages, errors, query, routes, SECRET } = require("./common");
const jwt = require("jsonwebtoken");
const app = express();
const saltRounds = 10;
const port = process.env.NODE_ENV === "test" ? 8081 : 8080;
const db = require("./database.js").db;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "secretcode",
		resave: true,
		saveUninitialized: true
	})
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConf")(passport);

//Sending over the api key
require("dotenv").config();

// app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(port, () => {
	console.log("Server running on port " + port);
});

app.post(routes.REGISTER, async (req, res) => {
	const [ok, reason] = validRegistrationParameters(req.body.name, req.body.email, req.body.password);
	if (!ok) {
		console.log(reason);
		res.status(StatusCodes.BAD_REQUEST).json({ error: reason });
		return;
	}

	bcrypt.hash(req.body.password, saltRounds, function(hashErr, hash) {
		if (hashErr) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.REGISTRATION_FAILED });
			return;
		}

		const params = [req.body.name, req.body.email, hash];
		db.run(query.INSERT_ACCOUNT, params, (dbErr, row) => {
			if (dbErr) {
				res.status(StatusCodes.CONFLICT).json({ error: messages.EMAIL_ALREADY_EXISTS });
			} else {
				res.status(StatusCodes.OK).json({ message: messages.REGISTRATION_SUCCEEDED });
			}
		});
	});
});


app.post(routes.LOGIN, async (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			let status, msg;
			switch (err) {
				case errors.USER_NOT_FOUND:
					status = StatusCodes.NOT_FOUND;
					msg = messages.USER_NOT_FOUND;
					break;
				case errors.INCORRECT_PASSWORD:
					status = StatusCodes.UNAUTHORIZED;
					msg = messages.INCORRECT_PASSWORD;
					break;
				default:
					status = StatusCodes.INTERNAL_SERVER_ERROR;
					msg = messages.UNEXPECTED_ERROR;
			}
			res.status(status).json({ error: msg });
		} else if (!user) {
			res.status(StatusCodes.NOT_FOUND).json({ error: messages.USER_NOT_FOUND });
		} else {
			req.logIn(user, (err) => {
				if (err) {
					res.status(StatusCodes.UNAUTHORIZED).json({ error: messages.LOGIN_FAILED });
				} else {
					const token = jwt.sign({ user: user.email }, SECRET);
					res.status(StatusCodes.OK).json({ message: messages.LOGIN_SUCCEEDED, token, name: user.name });
				}
			});
		}
	})(req, res, next);
});

app.post(routes.TWEET, async (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		const email = user.email;
		const tweet = req.body.tweet;
		const params = [email, tweet, new Date().getTime()];
		db.run(query.INSERT_TWEET, params, (dbErr, row) => {
			if (dbErr) {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: messages.TWEET_FAILURE });
			} else {
				res.status(StatusCodes.OK).json({ message: messages.TWEET_SUBMITTED });
			}
		});
	})(req, res, next);
});

app.get(routes.TWEETS_FROM_USER, async (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		const params = [req.params.email];
		db.all(query.GET_TWEETS, params, function(err, rows) {
			if (err) {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
				return console.error(err);
			}

			if (rows) {
				res.status(StatusCodes.OK).json(rows);
			} else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: messages.UNEXPECTED_ERROR
				});
			}
		});
	})(req, res, next);
});

app.get(routes.GET_ALL_TWEETS, async (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		db.all(query.GET_ALL_TWEETS, [], function(err, rows) {
			if (err) {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
				return console.error(err);
			}

			if (rows) {
				res.status(StatusCodes.OK).json(rows);
			} else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: messages.UNEXPECTED_ERROR
				});
			}
		});
	})(req, res, next);
});

app.post(routes.UPDATE_PASSWORD, async (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		const [ok, reason] = validPasswordFormat(req.body.newPassword);
		if (!ok) {
			console.log(reason);
			res.status(StatusCodes.BAD_REQUEST).json({ error: reason });
			return;
		}

		const [ok_curr, reason_curr] = validPasswordFormat(req.body.currentPassword);
		if (!ok_curr) {
			console.log(reason_curr);
			res.status(StatusCodes.BAD_REQUEST).json({ error: reason_curr });
			return;
		}

		/* // unfinished
		// check to see if the currentPassword listed, hashed, is the same as the one in the database
		bcrypt.hash(req.body.currentPassword, saltRounds, function(hashErr, hash) {
			if (hashErr) {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.PASSWORD_UPDATE_FAIL });
				return;
			}

			const params = req.body.email;
			db.run(query.GET_PASSWORD, params, (dbErr, row) => {
				if (dbErr) {
					res.status(StatusCodes.CONFLICT).json({ error: messages.PASSWORD_DB_FAIL });
				} else {
					// password is retrieved from data base
					// now compare it with the hashed currPassword
				}
			});
		});
		*/


		bcrypt.hash(req.body.newPassword, saltRounds, function(hashErr, hash) {
			if (hashErr) {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.PASSWORD_UPDATE_FAIL });
				return;
			}


			const params = [hash, req.body.email, req.body.name];
			db.run(query.UPDATE_PASSWORD, params, (dbErr, row) => {
				if (dbErr) {
					res.status(StatusCodes.CONFLICT).json({ error: messages.PASSWORD_DB_FAIL });
				} else {
					res.status(StatusCodes.OK).json({ message: messages.PASSWORD_UPDATE_SUCCESS });
				}
			});
		});
	})(req, res, next);
});


// Open Weather API call
app.get(routes.GET_WEATHER_API_KEY, async (err, res) => {
	if (res) {
		res.status(StatusCodes.OK).json(process.env.REACT_APP_WEATHER_API_KEY);
	}
});

module.exports.app = app;
module.exports.routes = routes;