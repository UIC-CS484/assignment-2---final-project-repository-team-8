var sqlite3 = require("sqlite3").verbose();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const passport = require("passport");
const StatusCodes = require("http-status-codes").StatusCodes;
const db = require("./database.js");
const validRegistrationParameters = require("./routes/registration");
const query = require("./query");
const app = express(); 
const saltRounds = 10;
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
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

const error = {
    BAD_REQUEST: "Please send a properly-formed request!",
    UNEXPECTED_ERROR: "Unexpected error. Please try again!",
    USER_NOT_FOUND: "User not found...",
    EMAIL_ALREADY_EXISTS: "Email already exists!",
    INCORRECT_PASSWORD: "Passwords do not match!"
};

app.post("/account/register", (req, res) => {
    const [ok, err] = validRegistrationParameters(req.body.name, req.body.email, req.body.password)
    if (!ok) {
        console.log(err)
        res.status(StatusCodes.BAD_REQUEST).json({"error": err});
        return;
    }

    bcrypt.hash(req.body.password, saltRounds, function (hashErr, hash) {
        if (hashErr) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"message": "Unable to register user. Please try again!"});
            return;
        }

        const params = [req.body.name, req.body.email, hash];
        db.run(query.INSERT_ACCOUNT, params, (dbErr, row) => {
            if (dbErr) {
                res.status(StatusCodes.CONFLICT).json({"error": error.EMAIL_ALREADY_EXISTS});
            } else {
                res.sendStatus(StatusCodes.OK);
            }
        });
    });

});


app.post("/account/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
            });
        }
    })(req, res, next);
});

app.get("/account", (req, res) => {
    if (!req.query.email) {
        res.status(StatusCodes.BAD_REQUEST).json({"error": error.BAD_REQUEST});
    }

    const params = [req.query.email];
    db.get(query.GET_ACCOUNT, params, function (err, row) {
        if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error": err.message});
            return console.error(err);
        }

        if (row) {
            res.status(StatusCodes.OK).json(row);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                "message": error.USER_NOT_FOUND
            });
        }
    });
});

app.get('/test', async (req, res) => {
	res.json({message: 'pass!'})
})

module.exports = app;