const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const passport = require("passport");
const StatusCodes = require("http-status-codes").StatusCodes;
const validRegistrationParameters = require("./routes/registration");
const query = require("./query");
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

app.listen(port, () => {
	console.log("Server running on port " + port);
});

const msg = {
	BAD_REQUEST: "Please send a properly-formed request!",
	UNEXPECTED_ERROR: "Unexpected error. Please try again!",
	USER_NOT_FOUND: "User not found...",
	EMAIL_ALREADY_EXISTS: "Email already exists!",
	INCORRECT_PASSWORD: "Passwords do not match!",
	REGISTRATION_FAILED: "Unable to register user. Please try again!",
	REGISTRATION_SUCCEEDED: "Successfully registered the account!",
	LOGIN_FAILED: "Login failed!",
	LOGIN_SUCCEEDED: "Successfully authenticated the login!",
	BAD_PASSWORD_FORMAT: "Please provide a valid password",
	BAD_EMAIL_FORMAT: "Please provide a valid email",
	BAD_REGISTRATION_PARAMETERS: "Please provide a name, email, and password"
};

const routes = {
	REGISTER: "/account/register",
	LOGIN: "/account/login",
	ACCOUNT: "/account"
};

app.post(routes.REGISTER, async (req, res) => {
	const [ok, err] = validRegistrationParameters(req.body.name, req.body.email, req.body.password);
	if (!ok) {
		console.log(err);
		res.status(StatusCodes.BAD_REQUEST).json({ error: err });
		return;
	}

	bcrypt.hash(req.body.password, saltRounds, function(hashErr, hash) {
		if (hashErr) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: msg.REGISTRATION_FAILED });
			return;
		}

		const params = [req.body.name, req.body.email, hash];
		db.run(query.INSERT_ACCOUNT, params, (dbErr, row) => {
			if (dbErr) {
				res.status(StatusCodes.CONFLICT).json({ error: msg.EMAIL_ALREADY_EXISTS });
			} else {
				res.status(StatusCodes.OK).json({ message: msg.REGISTRATION_SUCCEEDED });
			}
		});
	});
});


app.post(routes.LOGIN, async (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) res.status(StatusCodes.UNAUTHORIZED).json({ error: msg.LOGIN_FAILED });
		if (!user) res.status(StatusCodes.NOT_FOUND).json({ error: msg.USER_NOT_FOUND });
		else {
			req.logIn(user, (err) => {
				if (err) res.status(StatusCodes.UNAUTHORIZED).json({ error: msg.LOGIN_FAILED });
				res.status(StatusCodes.OK).json({ message: msg.LOGIN_SUCCEEDED });
			});
		}
	})(req, res, next);
});

app.get(routes.ACCOUNT, (req, res) => {
	if (!req.query.email) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: msg.BAD_REQUEST });
	}

	const params = [req.query.email];
	db.get(query.GET_ACCOUNT, params, function(err, row) {
		if (err) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
			return console.error(err);
		}

		if (row) {
			res.status(StatusCodes.OK).json(row);
		} else {
			res.status(StatusCodes.NOT_FOUND).json({
				error: msg.USER_NOT_FOUND
			});
		}
	});
});

module.exports.app = app;
module.exports.msg = msg;
module.exports.routes = routes;