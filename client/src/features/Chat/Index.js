import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../../hooks/useAuth';
import { Grid, Paper, Typography } from '@mui/material';
import Chat from './Chat';
import * as api from './api';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ChatList from './ChatList';
import SearchChat from './SearchChat';
const socket = io('http://localhost:5000');

function Index() {
  const [chats, setChats] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  useEffect(() => {
    api.fetchRecentChats(axiosPrivate).then((data) => {
      console.log(data);
      setChats(data);
      data.length && setSelectedChat(data[0]);
      socket.emit('join-self', user._id);
    });

    socket.on('receive-message', (message) => {
      receive_message(message);
    });

    // cleaning
    return () => {
      socket.off('receive-message');
      // socket.disconnect();
    };
  }, []);

  const receive_message = (message) => {
    setSelectedChat((selectedChat) =>
      selectedChat?._id === message.chat
        ? {
            ...selectedChat,
            messages: [...selectedChat.messages, message],
          }
        : selectedChat
    );
    setChats((chats) =>
      chats.map((chat) => {
        if (chat._id === message.chat) {
          return {
            ...chat,
            messages: [...chat.messages, message],
            date: '1 min',
            latestMessage: message.isSender
              ? `You: ${message.content}`
              : message.content,
          };
        }
        return chat;
      })
    );
  };

  const handleSendMessage = (message) => {
    receive_message({ ...message, isSender: true });

    socket.emit('send-message', message);
  };
  return (
    <>
      <Grid
        container
        component={Paper}
        marginTop={10}
        height={'80vh'}
        maxWidth={'1200px'}
      >
        {!chats?.length ? (
          <Typography variant="h4" alignSelf="center">
            No chats found
          </Typography>
        ) : (
          chats?.length && (
            <>
              <Grid
                item
                display={{ xs: 'none', sm: 'flex' }}
                bgcolor="#182424"
                xs={4}
                style={{
                  flexDirection: 'column',
                  height: '80vh',
                }}
              >
                {/* <SearchChat /> */}

                <ChatList
                  chats={chats}
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                />
              </Grid>
              <Grid item xs>
                {selectedChat && (
                  <Chat
                    chat={selectedChat}
                    handleSendMessage={handleSendMessage}
                  />
                )}
              </Grid>
            </>
          )
        )}
      </Grid>
    </>
  );
}

export default Index;
