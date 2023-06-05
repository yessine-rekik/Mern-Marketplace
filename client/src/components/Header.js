import React from 'react';
import { AppBar, Button, Toolbar, Link, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <AppBar>
      <Toolbar
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Link component={RouterLink} to="/" underline="none">
          Home
        </Link>
        <Link component={RouterLink} to="/protected" underline="none">
          Protected
        </Link>
        <Link component={RouterLink} to="/chat" underline="none">
          Chat
        </Link>
        {!user ? (
          <Link component={RouterLink} to="/login" underline="none">
            Login
          </Link>
        ) : (
          <Link component={RouterLink} onClick={handleLogout} underline="none">
            Logout
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
