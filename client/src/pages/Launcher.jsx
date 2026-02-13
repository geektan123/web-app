import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const Launcher = () => {
  const { currentUser, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate('/login');
      } else if (!userProfile || userProfile.status === 'New') {
        navigate('/profile/account-type');
      } else if (userProfile.status === 'Registered') {
        navigate('/profile/account-type');
      } else if (userProfile.status === 'Completed') {
        navigate('/app/home');
      }
    }
  }, [currentUser, userProfile, loading, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#FFE0E7',
        gap: 3
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: '#756568',
          fontFamily: 'serif'
        }}
      >
        Jain Maitri
      </Typography>
      <CircularProgress
        size={50}
        sx={{ color: '#EF3B5F' }}
      />
      <Typography
        variant="body1"
        sx={{ color: '#666666' }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Launcher;
