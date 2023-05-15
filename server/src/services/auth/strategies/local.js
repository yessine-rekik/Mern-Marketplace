const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../../user/user.model');
const passport = require('passport');

passport.use(
  new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          console.log('Invalid username!');
          return done(null, false);
        }

        if (await bcrypt.compare(password, user.password))
          return done(null, user);
        else {
          console.log('Invalid password');
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
