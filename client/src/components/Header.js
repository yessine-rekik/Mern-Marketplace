import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Link,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import {
  FavoriteBorder,
  ChatBubbleOutline,
  PersonOutline,
  AccountCircleOutlined,
  FavoriteBorderOutlined,
  LoginOutlined,
  LogoutOutlined,
  PostAddOutlined,
  Menu,
} from '@mui/icons-material';
import NavItem from './NavItem';
import Sidebar from './Sidebar';
function Header() {
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <AppBar sx={{ backgroundColor: '#212d39' }}>
      <Toolbar
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'visible',
        }}
      >
        <Sidebar />
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          sx={{ marginX: '1rem' }}
        >
          <Typography
            color="white"
            fontSize="1.25rem"
            display={{ xs: 'none', md: 'flex' }}
          >
            Marketplace
          </Typography>
        </Link>
        <NavItem
          path="/newlisting"
          text="Create new listing"
          Icon={PostAddOutlined}
        />
        <Search />
        <NavItem
          path="/favorites"
          text="Favorites"
          Icon={FavoriteBorderOutlined}
        />
        <NavItem path="/chat" text="Messages" Icon={ChatBubbleOutline} />
        <NavItem path="/profile" text="Profile" Icon={AccountCircleOutlined} />

        {!user ? (
          <NavItem
            path="/login"
            text="Login"
            Icon={LoginOutlined}
            sx={{ display: 'block' }}
          />
        ) : (
          <Link
            component={RouterLink}
            onClick={handleLogout}
            underline="none"
            sx={{
              marginX: '1rem',
              color: 'white',
              '&:hover': {
                color: 'darkOrange',
                transition: 'color 0.125s ease-in-out',
              },
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <LogoutOutlined style={{ fontSize: '1.25rem' }} />
              <Typography fontSize="small">Logout</Typography>
            </div>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
