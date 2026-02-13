import React from 'react';
import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';

import Home from '../pages/app/Home';
import Search from '../pages/app/Search';
import ChatList from '../pages/app/ChatList';
import MyProfile from '../pages/app/MyProfile';
import ViewProfile from '../pages/app/ViewProfile';
import SpecificChat from '../pages/app/SpecificChat';
import SavedProfiles from '../pages/app/SavedProfiles';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/app/home')) return 0;
    if (path.includes('/app/search')) return 1;
    if (path.includes('/app/chat')) return 2;
    if (path.includes('/app/profile')) return 3;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate('/app/home');
        break;
      case 1:
        navigate('/app/search');
        break;
      case 2:
        navigate('/app/chat');
        break;
      case 3:
        navigate('/app/profile');
        break;
      default:
        navigate('/app/home');
    }
  };

  const hideBottomNav = location.pathname.includes('/app/view-profile/') ||
                        location.pathname.includes('/app/chat/') ||
                        location.pathname.includes('/app/saved-profiles');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#FFE0E7'
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          pb: hideBottomNav ? 0 : 7
        }}
      >
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="chat" element={<ChatList />} />
          <Route path="chat/:chatId" element={<SpecificChat />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="view-profile/:profileId" element={<ViewProfile />} />
          <Route path="saved-profiles" element={<SavedProfiles />} />
        </Routes>
      </Box>

      {!hideBottomNav && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000
          }}
          elevation={3}
        >
          <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="Search"
              icon={<SearchIcon />}
            />
            <BottomNavigationAction
              label="Chat"
              icon={<ChatIcon />}
            />
            <BottomNavigationAction
              label="Profile"
              icon={<PersonIcon />}
            />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
};

export default MainLayout;
