const Chat = require('./chat.model');
const Message = require('./message.model');
const mongoose = require('mongoose');

async function getLatestChatsWithLasestMessages(req, res) {
  try {
    const uid = new mongoose.Types.ObjectId(req.user);

    const { chatsAmount, messagesAmount } = req.body;

    const chats = await Chat.aggregate([
      { $match: { users: { $in: [uid] } } },
      { $sort: { updatedAt: -1 } },
      { $limit: chatsAmount || 10 },

      {
        $lookup: {
          from: 'messages',
          let: { chatId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$chat', '$$chatId'] } } },
            { $sort: { updatedAt: -1 } },
            // { $limit: messagesAmount || 20 },
            { $sort: { updatedAt: 1 } },
            {
              $addFields: {
                isSender: { $eq: ['$sender', uid] },
              },
            },
            {
              $project: {
                _id: 0,
                sender: 0,
              },
            },
            {
              $project: {
                content: 1,
                updatedAt: 1,
                isSender: 1,
              },
            },
          ],
          as: 'messages',
        },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $project: {
          _id: 1,
          users: { _id: 1, username: 1 },
          messages: 1,
        },
      },
    ]);
    res.send(
      chats.map((chat) => {
        const otherUser =
          chat.users.find((user) => !uid.equals(user._id)) ||
          chat.users.find((user) => uid.equals(user._id)); //self

        return {
          ...chat,
          name: otherUser.username,
        };
      })
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

// async function getNextAmountOfMessages(req, res) {
//   try {
//     const { chat, amount, skipAmount } = req.body;

//     const messages = await Message.find({
//       chat,
//     })
//       .sort({ updatedAt: -1 })
//       .skip(skipAmount)
//       // should be sent from the client with messages.length
//       .limit(amount);

//     res.send(messages);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// }

// async function getNextAmountOfChats(req, res) {
//   try {
//     const uid = req.user;
//     const { amount, skipAmount } = req.body;

//     const chats = await Chat.find({
//       users: { $in: uid },
//     })
//       .sort({ updatedAt: -1 })
//       .skip(skipAmount)
//       .limit(amount);

//     res.send(chats);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// }

module.exports = {
  getLatestChatsWithLasestMessages,
  // getNextAmountOfChats,
  // getNextAmountOfMessages,
};
