const router = require('express').Router();
const verifyJwt = require('../../middlewares/verifyJWT');
const controller = require('./auth.controller');

router.post('/register', controller.register);

router.post('/login', controller.login);

router.post('/logout', controller.logout);

router.post('/refresh-token', controller.refreshToken);

//protected route
router.post('/protected', verifyJwt, (req, res) => {
  res.send('Access granted');
});

module.exports = router;
