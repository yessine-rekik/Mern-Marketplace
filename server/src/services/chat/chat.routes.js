const router = require('express').Router();
const mongoose = require('mongoose');
const chatController = require('./chat.controller');
const requireAuth = require('../../middlewares/verifyJWT');

router.get('/', requireAuth, chatController.getLatestChatsWithLasestMessages);

module.exports = router;
