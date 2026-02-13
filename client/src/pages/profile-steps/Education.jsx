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

const Education = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [degree, setDegree] = useState('');
  const [college, setCollege] = useState('');

  const handleNext = async () => {
    if (!degree.trim() || !college.trim()) {
      alert('Please fill all fields');
      return;
    }

    const data = {
      Degree: degree.trim(),
      College: college.trim()
    };

    updateProfileData(data);

    await usersAPI.updateUser(currentUser.uid, data);

    navigate('/profile/interests');
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
            Educational Information
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Step 7 of 14
          </Typography>

          <TextField
            fullWidth
            label="Highest Degree"
            variant="outlined"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="e.g., B.Tech, MBA, M.D."
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="College / University"
            variant="outlined"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
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

export default Education;
