const router = require('express').Router();

const userRouter = require('./services/user/user.routes');
const authRouter = require('./services/auth/auth.routes');

router.use('/user', userRouter);
router.use('/', authRouter);

module.exports = router;
