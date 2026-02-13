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

const FamilyInfo1 = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [fatherName, setFatherName] = useState('');
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [motherName, setMotherName] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');

  const handleNext = async () => {
    if (!fatherName.trim() || !fatherOccupation.trim() || !motherName.trim() || !familyMembers.trim()) {
      alert('Please fill all fields');
      return;
    }

    const data = {
      FatherName: fatherName.trim(),
      FatherOccupation: fatherOccupation.trim(),
      MotherName: motherName.trim(),
      FamilyMembers: familyMembers.trim()
    };

    updateProfileData(data);

    await usersAPI.updateUser(currentUser.uid, data);

    navigate('/profile/family-info-2');
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
            Family Information
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Step 9 of 14
          </Typography>

          <TextField
            fullWidth
            label="Father's Name"
            variant="outlined"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Father's Occupation"
            variant="outlined"
            value={fatherOccupation}
            onChange={(e) => setFatherOccupation(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Mother's Name"
            variant="outlined"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Number of Family Members"
            variant="outlined"
            type="number"
            value={familyMembers}
            onChange={(e) => setFamilyMembers(e.target.value)}
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

export default FamilyInfo1;
