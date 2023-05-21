const router = require('express').Router();

const userRouter = require('./services/user/user.routes');
const authTest = require('./services/auth/auth.routes');

router.use('/user', userRouter);
router.use('/', authTest);

module.exports = router;
