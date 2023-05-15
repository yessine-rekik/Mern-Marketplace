const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../user/user.model');
const passport = require('passport');

passport.use(
  new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) done(null, false);

        if (await bcrypt.compare(password, user.password)) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
