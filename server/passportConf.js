const bcrypt = require("bcrypt");
const db = require("./database.js");
const query = require("./query");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {

  passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
      db.get(query.GET_ACCOUNT, email, function(err, row) {
          if (err) throw err;
          if (!row) return done(null, false);
          if(bcrypt.compareSync(password, row.password)){
            done(null, row);
          } else {
            done(null, false);
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