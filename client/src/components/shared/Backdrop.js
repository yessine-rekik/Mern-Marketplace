import { CircularProgress, Backdrop } from '@mui/material';
import React from 'react';

function Comp() {
  return (
    <Backdrop open={true} sx={{ backgroundColor: 'transparent' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Comp;
