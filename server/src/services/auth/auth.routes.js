const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).send('Invalid username or password');

    const token = jwt.sign({ data: user._id }, process.env.SECRET_KEY, {
      expiresIn: '3d',
    });

    res
      .cookie('jwt', token, { httpOnly: true, maxAge: 259200000 }) //3d
      .send('You are logged in');
  })(req, res, next);
});

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.send('You are authenticated')
);

module.exports = router;
