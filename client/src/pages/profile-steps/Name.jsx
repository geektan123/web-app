import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { usersAPI } from '../../services/api';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  TextField
} from '@mui/material';

const Name = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleNext = async () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    const data = { Name: name.trim() };
    updateProfileData(data);

    await usersAPI.updateUser(currentUser.uid, data);

    navigate('/profile/dob');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#FFE0E7',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#756568',
              mb: 1,
              textAlign: 'center'
            }}
          >
            What's your name?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Step 1 of 14
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleNext}
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
            Next
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Name;
