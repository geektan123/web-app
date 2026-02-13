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
  TextField,
  MenuItem
} from '@mui/material';

const familyTypes = [
  'Nuclear Family',
  'Joint Family',
  'Extended Family'
];

const FamilyInfo2 = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [familyType, setFamilyType] = useState('');
  const [parentState, setParentState] = useState('');
  const [parentCity, setParentCity] = useState('');

  const handleNext = async () => {
    if (!familyType || !parentState.trim() || !parentCity.trim()) {
      alert('Please fill all fields');
      return;
    }

    const data = {
      Familytype: familyType,
      ParentState: parentState.trim(),
      ParentCity: parentCity.trim(),
      status: 'Registered'
    };

    updateProfileData(data);

    await usersAPI.updateUser(currentUser.uid, data);

    navigate('/profile/image-1');
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
            Family Details
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Step 10 of 14
          </Typography>

          <TextField
            fullWidth
            select
            label="Family Type"
            variant="outlined"
            value={familyType}
            onChange={(e) => setFamilyType(e.target.value)}
            sx={{ mb: 3 }}
          >
            {familyTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Parents' State"
            variant="outlined"
            value={parentState}
            onChange={(e) => setParentState(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Parents' City"
            variant="outlined"
            value={parentCity}
            onChange={(e) => setParentCity(e.target.value)}
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

export default FamilyInfo2;
