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

const Description = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');

  const handleNext = async () => {
    if (!description.trim()) {
      alert('Please write something about yourself');
      return;
    }

    const data = {
      Description: description.trim()
    };

    updateProfileData(data);

    await usersAPI.updateUser(currentUser.uid, data);

    navigate('/profile/income');
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
            Describe Yourself
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Step 5 of 14
          </Typography>

          <TextField
            fullWidth
            label="About You"
            variant="outlined"
            multiline
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a brief description about yourself, your interests, and what you're looking for..."
            sx={{ mb: 3 }}
          />

          <Typography
            variant="caption"
            sx={{ color: '#666666', display: 'block', mb: 2 }}
          >
            {description.length} characters
          </Typography>

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

export default Description;
