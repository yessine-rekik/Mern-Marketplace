import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';

const getLatestMessage = (messages = []) => {
  const latestMessage = messages[messages.length - 1];
  return latestMessage.isSender
    ? `Vous: ${latestMessage.content}`
    : latestMessage.content;
};

function ChatList({ chats, selectedChat, setSelectedChat }) {
  return (
    <List style={{ overflowY: 'auto' }}>
      {chats.map((chat) => (
        <Box
          key={chat._id}
          bgcolor={selectedChat._id === chat._id && '#1e2c42'}
          borderRadius={3}
          marginX="0.5rem"
          sx={
            selectedChat._id !== chat._id
              ? {
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#404444',
                  },
                }
              : {}
          }
        >
          <ListItemButton
            disableRipple
            onClick={() => setSelectedChat(chat)}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon>
              <Avatar src={chat.img} />
            </ListItemIcon>
            <ListItemText
              primary={chat.name}
              secondary={`${
                [
                  '2 weeks',
                  'Saturday',
                  '4 weeks',
                  '1 year',
                  '8 weeks',
                  '15h30',
                ][Math.floor(Math.random() * 5)]
              } - ${getLatestMessage(chat.messages)}`}
              primaryTypographyProps={{
                // variant: 'h6',
                fontSize: 18,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
              secondaryTypographyProps={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            ></ListItemText>
          </ListItemButton>
        </Box>
      ))}
    </List>
  );
}

export default ChatList;
