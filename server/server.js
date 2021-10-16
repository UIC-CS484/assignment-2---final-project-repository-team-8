const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const passport = require("passport");
const StatusCodes = require("http-status-codes").StatusCodes;
const validRegistrationParameters = require("./routes/registration");
const messages = require("./message").messages;
const errors = require("./errors").errors;

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
		if (err === errors.USER_NOT_FOUND) {
			res.status(StatusCodes.NOT_FOUND).json({ error: messages.USER_NOT_FOUND });
		} else if (err === errors.INCORRECT_PASSWORD) {
			res.status(StatusCodes.UNAUTHORIZED).json({ error: messages.INCORRECT_PASSWORD });
		} else if (err) {
			res.status(StatusCodes.UNAUTHORIZED).json({ error: messages.LOGIN_FAILED });
		} else if (!user) {
			res.status(StatusCodes.NOT_FOUND).json({ error: messages.USER_NOT_FOUND });
		} else {
			req.logIn(user, (err) => {
				if (err) {
					res.status(StatusCodes.UNAUTHORIZED).json({ error: messages.LOGIN_FAILED });
				} else {
					res.status(StatusCodes.OK).json({ message: messages.LOGIN_SUCCEEDED });
				}
			});
		}
	})(req, res, next);
});

app.get(routes.ACCOUNT, (req, res) => {
	if (!req.query.email) {
		res.status(StatusCodes.BAD_REQUEST).json({ error: messages.BAD_REQUEST });
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
				error: messages.USER_NOT_FOUND
			});
		}
	});
});

module.exports.app = app;
module.exports.routes = routes;