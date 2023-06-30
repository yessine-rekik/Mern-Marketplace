import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default ({ path, text, Icon, sx }) => {
  return (
    <Link
      component={RouterLink}
      to={path}
      underline="none"
      sx={{
        display: { xs: 'none', md: 'block' },
        ...sx,
        paddingX: '1rem',
        color: 'white',
        '&:hover': {
          color: 'darkOrange',
          transition: 'color 0.125s ease-in-out',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          alignItems: 'center',
        }}
      >
        <Icon sx={{ fontSize: '1.25rem' }} />
        <Typography
          marginLeft={{ xs: '0.75rem', md: '0' }}
          fontSize="small"
          noWrap
        >
          {text}
        </Typography>
      </Box>
    </Link>
  );
};
