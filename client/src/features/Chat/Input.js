import { SendRounded } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

function Input({ sendMessage }) {
  const [message, setMessage] = useState('');
  return (
    <div style={section3.wrapper}>
      <TextField
        sx={section3.textField}
        value={message}
        placeholder="Type a message..."
        multiline
        maxRows={5}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (message.trim().length)
              sendMessage(message, () => setMessage(''));
          }
        }}
        onChange={(e) => setMessage(e.target.value)}
      />

      <IconButton disabled={!message.trim().length} onClick={sendMessage}>
        <SendRounded
          sx={{ color: message.trim().length ? '#046ccc' : 'grey' }}
        />
      </IconButton>
    </div>
  );
}

export default Input;

const section3 = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.75rem',
  },
  textField: {
    flexGrow: 1,
    overflowY: 'auto',
    marginRight: 3,
    borderRadius: 10,
    backgroundColor: '#2f3335',

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'transparent', // default border color
      },
      '&:hover fieldset': {
        borderColor: 'transparent', // on hove
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent', // on focus
      },
    },
  },
};
