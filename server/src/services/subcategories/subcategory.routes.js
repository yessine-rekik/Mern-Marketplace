const router = require('express').Router();
const controller = require('./subcategory.controller');

router.post('/', controller.insert);

module.exports = router;
