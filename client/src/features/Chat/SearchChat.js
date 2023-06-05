import { Search } from '@mui/icons-material';
import { TextField, IconButton } from '@mui/material';
import React from 'react';

function SearchChat() {
  return (
    <div style={{ margin: '0.75rem' }}>
      <TextField
        placeholder="Search..."
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton
              size="medium"
              // onClick={() => handleSearch()}
              edge="end"
            >
              <Search />
            </IconButton>
          ),
        }}
        sx={{
          borderRadius: 20,
          backgroundColor: '#2f3335',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent', // default border color
            },
            '&:hover fieldset': {
              borderColor: 'transparent', // Remove hover border color
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', // Remove focused border color
            },
          },
        }}
      />
    </div>
  );
}

export default SearchChat;
