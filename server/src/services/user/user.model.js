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
  totalAds: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('users', UserSchema);
