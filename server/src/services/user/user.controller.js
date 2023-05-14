const User = require('./user.model');
const genericController = require('../../utils/genericController');

const createUser = (req, res) => {
  const condition = { username: req.body.username };
  genericController.createDocument(req, res, User, condition);
};

const deleteUser = (req, res) => {
  genericController.deleteDocument(req, res, User);
};

const fetchUsers = (req, res) => {
  genericController.fetchDocuments(req, res, User);
};

module.exports = {
  createUser,
  deleteUser,
  fetchUsers,
};
