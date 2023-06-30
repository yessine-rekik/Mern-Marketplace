import React, { useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  TextField,
  IconButton,
  Box,
  Typography,
  Link,
  Autocomplete,
} from '@mui/material';
import axios from '../config/axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

function Search() {
  const [input, setInput] = useState('');

  const navigate = useNavigate();
  //   const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e, value) => {
    setInput(value);
  };

  const handleSearch = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('search')?.trim() === input?.trim()) return;

    if (!input?.trim().length) return;
    try {
      navigate(`/ads?search=${input.trim()}`);
      //   setSearchParams({ search: input });
      //   const result = await axios.get('/ads', {
      //     params: {
      //       title: input,
      //     },
      //   });
    } catch (err) {
      alert('Error');
      console.log(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <Autocomplete
      disableClearable={!input?.length}
      value={input}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      freeSolo
      fullWidth
      options={[]}
      // renderOption={(props, option) => (
      //     <Typography {...props}>
      //       <span>{option}</span>
      //     </Typography>
      // )}
      PaperComponent={({ children }) => (
        <Box style={{ backgroundColor: '#2f3335', borderRadius: 5 }}>
          {children}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onChange={(e) => handleChange(e, e.target.value)}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <IconButton
                sx={{ marginRight: '1rem' }}
                size="medium"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{
            justifyContent: 'center',
            marginY: '0.5rem',
            height: 45,

            borderRadius: 5,
            backgroundColor: '#2f3335',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
          }}
        />
      )}
    />
  );
}

export default Search;
