const router = require('express').Router();

const authRouter = require('./services/auth/auth.routes');
const chatRouter = require('./services/chat/chat.routes');
const categoryRouter = require('./services/categories/category.routes');
const subcategoryRouter = require('./services/subcategories/subcategory.routes');
const itemsRouter = require('./services/items/items.routes');

router.use('/', authRouter);
router.use('/chat', chatRouter);
router.use('/categories', categoryRouter);
router.use('/subcategories', subcategoryRouter);
router.use('/items', itemsRouter);

module.exports = router;
