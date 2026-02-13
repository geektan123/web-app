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
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

const Cast = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState('');

  const digambarOptions = [
    'Aggarwal', 'Bagadwal', 'Bagherwal', 'Bansal', 'Bisa', 'Goyal', 'Gupta',
    'Jain Ayodhya', 'Jain Parwar', 'Jain Shastri', 'Jain Vyas', 'Kalawar',
    'Mittal', 'Nagar', 'Nawalgar', 'Pancholi', 'Panchmata', 'Porwal',
    'Sarawagi', 'Singhal', 'Tarawad', 'Umrav', 'Upadhyay', 'Vaish', 'Others'
  ];

  const shwetambarOptions = [
    'Agrawal', 'Badhbunj', 'Bagadiya', 'Bisa', 'Chomal', 'Choudhary',
    'Dhuka', 'Doshi', 'Gandharva', 'Garg', 'Ghosh', 'Gorkha', 'Goyal',
    'Gulvaish', 'Jain Ayodhyapati', 'Jain Napit', 'Jain Shah', 'Jain Sonara',
    'Jhansari', 'Joshi', 'Kalawar', 'Kandoi', 'Kansara', 'Kotwal', 'Ladwa',
    'Lahoti', 'Lodha', 'Loonka', 'Malu', 'Mehta', 'Nagar', 'Narsingpura',
    'Osmiya', 'Padmavat', 'Palliwal', 'Panchal', 'Panchmata', 'Parikh',
    'Patni', 'Piplia', 'Porwal', 'Ranka', 'Sarawagi', 'Seegra', 'Shah',
    'Shrimali', 'Sogani', 'Sonara', 'Soni', 'Vaidya', 'Vijayvargiya', 'Others'
  ];

  const [mainCategory, setMainCategory] = useState('');
  const [availableOptions, setAvailableOptions] = useState([]);

  const handleMainCategoryChange = (value) => {
    setMainCategory(value);
    setSubcategory('');
    if (value === 'Digambar') {
      setAvailableOptions(digambarOptions);
    } else if (value === 'Shwetambar') {
      setAvailableOptions(shwetambarOptions);
    }
  };

  const handleNext = async () => {
    if (!mainCategory || !subcategory) {
      alert('Please select community');
      return;
    }

    const data = {
      Subcategory: `${mainCategory} - ${subcategory}`
    };

    updateProfileData(data);

    await usersAPI.updateUser(currentUser.uid, data);

    navigate('/profile/location');
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
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxHeight: '80vh', overflow: 'auto' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#756568',
              mb: 1,
              textAlign: 'center'
            }}
          >
            Jain Community
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Step 3 of 14
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
              Select Main Category:
            </Typography>
            <RadioGroup value={mainCategory} onChange={(e) => handleMainCategoryChange(e.target.value)}>
              <FormControlLabel
                value="Digambar"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Digambar"
              />
              <FormControlLabel
                value="Shwetambar"
                control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                label="Shwetambar"
              />
            </RadioGroup>
          </Box>

          {mainCategory && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                Select Subcategory:
              </Typography>
              <RadioGroup value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                {availableOptions.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio sx={{ color: '#EF3B5F', '&.Mui-checked': { color: '#EF3B5F' } }} />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </Box>
          )}

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

export default Cast;
