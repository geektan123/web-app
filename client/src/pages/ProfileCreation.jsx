import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { usersAPI } from '../services/api';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
const ProfileCreation = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [accountManagedFor, setAccountManagedFor] = useState('');
  const [gender, setGender] = useState('');
  const handleNext = async () => {
    if (!accountManagedFor || !gender) {
      alert('Please select both options');
      return;
    }
    const data = {
      Account_Managed_for: accountManagedFor,
      profileGender: gender,
      Gender: gender
    };
    updateProfileData(data);
    await usersAPI.updateUser(currentUser.uid, data);
    navigate('/profile/name');
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
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#756568',
              mb: 3,
              textAlign: 'center'
            }}
          >
            Create Your Profile
          </Typography>
          {}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: '#000000',
                mb: 2
              }}
            >
              This account is managed for:
            </Typography>
            <RadioGroup
              value={accountManagedFor}
              onChange={(e) => setAccountManagedFor(e.target.value)}
            >
              <FormControlLabel
                value="Self"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Self"
              />
              <FormControlLabel
                value="Parents"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Parents"
              />
              <FormControlLabel
                value="Siblings"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Siblings"
              />
              <FormControlLabel
                value="Relatives"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Relatives"
              />
            </RadioGroup>
          </Box>
          {}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: '#000000',
                mb: 2
              }}
            >
              Gender:
            </Typography>
            <RadioGroup
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value="Male"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Male"
              />
              <FormControlLabel
                value="Female"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Female"
              />
            </RadioGroup>
          </Box>
          {}
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
export default ProfileCreation;