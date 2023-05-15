const User = require('./user.model');
const genericController = require('../../utils/genericController');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const condition = { username: req.body.username };
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    genericController.createDocument(req, res, User, condition);
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = (req, res) => {
  genericController.deleteDocument(req, res, User);
};

const updateUser = (req, res) => {
  genericController.updateDocument(req, res, User);
};

const fetchUsers = (req, res) => {
  genericController.fetchDocuments(req, res, User);
};

module.exports = {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
};
