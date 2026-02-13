import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usersAPI } from '../../services/api';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VerificationComplete = () => {
  const { currentUser, refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const completeProfile = async () => {
      await usersAPI.updateUser(currentUser.uid, {
        status: 'Completed'
      });
      await refreshProfile();
    };

    completeProfile();
  }, [currentUser]);

  const handleContinue = () => {
    navigate('/app/home');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#FFE0E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <CheckCircleIcon
            sx={{
              fontSize: 100,
              color: '#4caf50',
              mb: 3
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: '#756568',
              mb: 2
            }}
          >
            Profile Complete!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#666666',
              mb: 4
            }}
          >
            Your profile has been created successfully. You can now start discovering matches and connecting with people in the Jain community.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleContinue}
            sx={{
              bgcolor: '#EF3B5F',
              color: '#ffffff',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#d32f4f'
              }
            }}
          >
            Start Exploring
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerificationComplete;
