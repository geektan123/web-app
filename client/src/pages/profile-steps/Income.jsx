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
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

const incomeRanges = [
  'Less than 3 Lakhs',
  '3-5 Lakhs',
  '5-7 Lakhs',
  '7-10 Lakhs',
  '10-15 Lakhs',
  '15-20 Lakhs',
  '20-30 Lakhs',
  '30-50 Lakhs',
  '50 Lakhs - 1 Crore',
  'More than 1 Crore',
  'Prefer not to say'
];

const Income = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [incomeType, setIncomeType] = useState('');

  const handleNext = async () => {
    if (!role.trim() || !company.trim() || !incomeRange || !incomeType) {
      alert('Please fill all fields');
      return;
    }

    const data = {
      Role: role.trim(),
      Company: company.trim(),
      IncomeRange: incomeRange,
      IncomeType: incomeType
    };

    updateProfileData(data);

    await usersAPI.updateUser(currentUser.uid, data);

    navigate('/profile/education');
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
            Professional Information
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Step 6 of 14
          </Typography>

          <TextField
            fullWidth
            label="Role / Designation"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Company / Organization"
            variant="outlined"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            select
            label="Annual Income Range"
            variant="outlined"
            value={incomeRange}
            onChange={(e) => setIncomeRange(e.target.value)}
            sx={{ mb: 3 }}
          >
            {incomeRanges.map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Income Type:
            </Typography>
            <RadioGroup
              value={incomeType}
              onChange={(e) => setIncomeType(e.target.value)}
            >
              <FormControlLabel
                value="Monthly"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Monthly"
              />
              <FormControlLabel
                value="Annually"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Annually"
              />
            </RadioGroup>
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

export default Income;
