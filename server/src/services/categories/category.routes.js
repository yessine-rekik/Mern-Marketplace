const router = require('express').Router();
const controller = require('./category.controller');

router.get('/', controller.fetchAll);
router.post('/', controller.insert);

module.exports = router;
