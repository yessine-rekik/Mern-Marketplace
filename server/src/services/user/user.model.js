const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokens: [String],
  accessToken: String,
});

module.exports = mongoose.model('users', UserSchema);
