import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material';

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

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Typography
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                variant="h6"
              >
                {chat.name}
              </Typography>
              <div style={{ display: 'flex' }}>
                <Typography
                  color="grey"
                  variant="body2"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  marginRight={'0.5rem'}
                >
                  {chat.latestMessage}
                </Typography>
                <Typography color="grey" variant="body2" whiteSpace="nowrap">
                  - {chat.date}
                </Typography>
              </div>
            </div>
          </ListItemButton>
        </Box>
      ))}
    </List>
  );
}

export default ChatList;
