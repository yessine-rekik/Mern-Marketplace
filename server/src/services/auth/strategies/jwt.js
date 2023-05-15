require('dotenv').config();
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../../user/user.model');

const secretKey = process.env.SECRET_KEY;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.data);
      if (user) {
        return done(null, user);
      }
      console.log('Invalid Token');
      return done(null, false);
    } catch (err) {
      return done(err);
    }
  })
);
