const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  users: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model('chats', ChatSchema);
