const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('messages', MessageSchema);
