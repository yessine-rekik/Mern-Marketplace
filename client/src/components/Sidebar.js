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
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import NavItem from './NavItem';
import Search from './Search';
import { Link as RouterLink } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        // edge="start"
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <Menu />
      </IconButton>

      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            // boxSizing: 'border-box',
            width: 240,
            backgroundColor: '#081421',
          },
        }}
      >
        <Link
          onClick={() => setIsOpen(false)}
          component={RouterLink}
          to="/"
          underline="none"
          sx={{ marginX: '1rem', alignSelf: 'center', marginTop: '1rem' }}
        >
          <Typography color="white" fontSize="1.25rem">
            Marketplace
          </Typography>
        </Link>

        <Divider sx={{ marginTop: '1rem' }} />
        <Box onClick={() => setIsOpen(false)}>
          <NavItem
            path="/newlisting"
            text="Create new listing"
            Icon={PostAddOutlined}
            sx={{
              display: 'block',
              padding: '1rem 0',
            }}
          />
        </Box>

        <Divider />

        <Box onClick={() => setIsOpen(false)}>
          <NavItem
            path="/favorites"
            text="Favorites"
            Icon={FavoriteBorderOutlined}
            sx={{ display: 'block', paddingTop: '1rem' }}
          />

          <NavItem
            path="/chat"
            text="Messages"
            Icon={ChatBubbleOutline}
            sx={{ display: 'block', paddingTop: '1rem' }}
          />

          <NavItem
            path="/profile"
            text="Profile"
            Icon={AccountCircleOutlined}
            sx={{ display: 'block', paddingTop: '1rem' }}
          />
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
