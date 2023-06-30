const router = require('express').Router();
const controller = require('./items.controller');
const multer = require('multer');
const path = require('path');
const requireAuth = require('../../middlewares/verifyJWT');

const pathname = path.join(__dirname, '../../uploads');
console.log(pathname);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, pathname);
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/:id', controller.fetchOne);
router.get('/', controller.fetchAll);
router.post('/', requireAuth, upload.array('images'), controller.insert);

module.exports = router;
