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
  Chip
} from '@mui/material';

const availableInterests = [
  'Reading', 'Traveling', 'Cooking', 'Music', 'Dancing', 'Yoga', 'Fitness',
  'Photography', 'Art', 'Sports', 'Movies', 'Gaming', 'Writing', 'Swimming',
  'Cycling', 'Hiking', 'Meditation', 'Gardening', 'Fashion', 'Technology'
];

const Interests = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleToggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 6) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        alert('You can select up to 6 interests only');
      }
    }
  };

  const handleNext = async () => {
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest');
      return;
    }

    const data = {
      Interest1: selectedInterests[0] || '',
      Interest2: selectedInterests[1] || '',
      Interest3: selectedInterests[2] || '',
      Interest4: selectedInterests[3] || '',
      Interest5: selectedInterests[4] || '',
      Interest6: selectedInterests[5] || ''
    };

    updateProfileData(data);

    await usersAPI.updateUser(currentUser.uid, data);

    navigate('/profile/family-info-1');
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
            Your Interests
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 1,
              textAlign: 'center'
            }}
          >
            Step 8 of 14
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Select up to 6 interests
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#EF3B5F',
              mb: 2,
              textAlign: 'center',
              fontWeight: 500
            }}
          >
            Selected: {selectedInterests.length} / 6
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: 4
            }}
          >
            {availableInterests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                onClick={() => handleToggleInterest(interest)}
                sx={{
                  bgcolor: selectedInterests.includes(interest) ? '#EF3B5F' : '#f0f0f0',
                  color: selectedInterests.includes(interest) ? '#ffffff' : '#000000',
                  '&:hover': {
                    bgcolor: selectedInterests.includes(interest) ? '#d32f4f' : '#e0e0e0'
                  },
                  cursor: 'pointer'
                }}
              />
            ))}
          </Box>

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

export default Interests;
