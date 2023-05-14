const router = require('express').Router();

const userRouter = require('./services/user/user.routes');

router.use('/user', userRouter);

module.exports = router;
