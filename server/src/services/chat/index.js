const { default: mongoose } = require('mongoose');
const config = require('../../config');
const Chat = require('./chat.model');
const Message = require('./message.model');

module.exports = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: config.origin,
      pingTimeout: 60000, // 60s
    },
  });

  io.on('connection', (socket) => {
    console.log(`A client has been connected to the socket ${socket.id}`);

    // on connection join self
    socket.on('join-self', (id) => {
      socket.join(id);
      socket.userId = id;
      console.log(`user ${socket.userId} joined itself`);
    });

    socket.on('send-message', async (message) => {
      try {
        const room = message.chat;

        // insert in db
        await Message.create({ ...message, sender: socket.userId });

        // emit receive message
        const fetchedChat = await Chat.findById(room);
        const recipients = fetchedChat.users.map((user) => user.toString());
        socket.to(recipients).emit('receive-message', message);
      } catch (err) {
        console.log(err);
      }
    });
  });
};
