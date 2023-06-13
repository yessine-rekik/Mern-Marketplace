import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Fab,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowBack, ArrowDownward, SendRounded } from '@mui/icons-material';
import Input from './Input';

const getDate = (date) => {
  const givenDate = new Date(date);
  const today = new Date();

  const oneWeekMs = 1000 * 60 * 60 * 24 * 7;
  const msDiff = Math.abs(today.getTime() - givenDate.getTime());
  const weeksDiff = Math.floor(msDiff / oneWeekMs);
  if (weeksDiff > 0) {
    return givenDate.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    if (today.getDay() - givenDate.getDay() === 0) return 'Today';
    else if (today.getDay() - givenDate.getDay() === 1) return 'Yesterday';
    else {
      const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      return weekdays[givenDate.getDay()];
    }
  }
};

function Chat({ chat, handleSendMessage }) {
  const [showFab, setShowFab] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(true);
  const scrollRef = useRef();

  useEffect(() => {
    if (shouldScroll || chat.messages[chat.messages.length - 1]?.isSender)
      scrollToBottom();
  }, [chat]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 20);
  }, []);

  const scrollToBottom = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const sendMessage = useCallback((message, cb) => {
    handleSendMessage({
      chat: chat._id,
      content: message.trim(),
    });
    cb();
  }, []);

  const handleScroll = () => {
    const scrollElement = scrollRef.current;

    const isAtBottom =
      scrollElement.scrollTop + scrollElement.clientHeight >=
      scrollElement.scrollHeight - 300;
    setShowFab(!isAtBottom);

    Math.ceil(scrollElement.scrollTop + scrollElement.clientHeight) ===
    scrollElement.scrollHeight
      ? setShouldScroll(true)
      : setShouldScroll(false);
  };

  return (
    <div style={wrapper}>
      {/* Chat info */}
      <div style={section1.wrapper}>
        {/* <Box display={{ md: 'none' }} marginRight="1rem">
          <Fab size="small">
            <ArrowBack />
          </Fab>
        </Box> */}
        <Avatar src={chat.img} />
        <Typography style={{ marginLeft: '1rem' }} variant="h6" noWrap>
          {chat.name}
        </Typography>
      </div>
      {/* Conversation */}
      <div ref={scrollRef} style={section2.wrapper} onScroll={handleScroll}>
        {chat.messages?.map((msg, index) => (
          <React.Fragment key={index}>
            {/* <Typography variant="body2" color="grey" marginTop="1rem">
              {getDate(msg.updatedAt)}
            </Typography> */}
            <Box key={index} sx={section2.messageBox(msg)}>
              <span style={section2.messageSpan}>{msg.content}</span>
            </Box>
          </React.Fragment>
        ))}

        {showFab && (
          <Box
            style={{
              position: 'sticky',
              bottom: 20,
            }}
          >
            <Fab size="small" onClick={scrollToBottom}>
              <ArrowDownward />
            </Fab>
          </Box>
        )}
        {/* <div ref={bottomScrollRef} /> */}
      </div>

      {/* Input message */}
      <Input sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', height: '80vh' },

  section1: {
    wrapper: {
      // height: '1em',
      display: 'flex',
      alignItems: 'center',
      margin: '1rem 1rem',
    },
  },

  section2: {
    wrapper: {
      backgroundColor: '#1d1f20',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      flexGrow: 1,
    },
    messageBox: (msg) => ({
      maxWidth: '80%',
      bgcolor: msg.isSender ? '#046ccc' : '#404444',
      borderRadius: '10px',
      alignSelf: msg.isSender ? 'flex-end' : 'flex-start',
      textAlign: 'start',
      marginX: '0.75rem',
      marginY: '0.25rem',
    }),
    messageSpan: {
      padding: '7.5px 10px',
      wordWrap: 'break-word',
      display: 'block',
      fontSize: 18,
    },
  },
};

const { section1, section2, wrapper } = styles;
