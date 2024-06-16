const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user.model');
const hasher = require('../hasher');

localCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({username});
    
    if (!user) return done(null, false, {message: 'Username or Password wrong'});
    const isMatch = await hasher.compare(password, user.password);
    if (!isMatch) return done(null, false, {message: 'Username or Password wrong'});

    return done(null, user);
  } catch (error) {
    return done(error, false, { message: 'Something went wrong'});
  }
}

const initialize = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(localCallback));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

}

module.exports = { 
  initialize,
  passport,
  authenticate: passport.authenticate,
 };