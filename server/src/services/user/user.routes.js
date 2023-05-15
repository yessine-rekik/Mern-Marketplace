const router = require('express').Router();
const controller = require('./user.controller');

router.post('/', controller.createUser);
router.delete('/', controller.deleteUser);
router.get('/:id?', controller.fetchUsers);
router.put('/', controller.updateUser);

module.exports = router;
