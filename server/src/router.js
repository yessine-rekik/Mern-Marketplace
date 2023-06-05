const router = require('express').Router();

const authRouter = require('./services/auth/auth.routes');
const chatRouter = require('./services/chat/chat.routes');

router.use('/', authRouter);
router.use('/chat', chatRouter);

module.exports = router;
