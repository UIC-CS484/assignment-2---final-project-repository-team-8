const bcrypt = require("bcrypt");
const db = require("./database.js");
const query = require("./query");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {

  passport.use(new localStrategy((email, password, done) => {
    console.log(email)
    db.get(query.GET_EMAIL, email, function(err, user) {
        if (err) throw err;
        if (!user) return done(null, false);
        let pass = db.get(query.GET_PASSWORD, email)
        bcrypt.compare(pass, password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.email);
  });
  passport.deserializeUser((email, cb) => {
    db.get(query.GET_EMAIL, email, function(err, user) {
      cb(err, user);
    });
  });
};