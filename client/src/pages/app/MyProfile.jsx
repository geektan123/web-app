import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  IconButton
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const MyProfile = () => {
  const { currentUser, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!userProfile) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#FFE0E7',
        pb: 2
      }}
    >
      <Container maxWidth="md" sx={{ pt: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#756568'
            }}
          >
            My Profile
          </Typography>

          <IconButton
            onClick={handleLogout}
            sx={{ color: '#EF3B5F' }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>

        {/* Profile Card */}
        <Card sx={{ mb: 2, borderRadius: 3 }}>
          <Box
            sx={{
              height: 300,
              bgcolor: '#f5f5f5',
              backgroundImage: `url(${userProfile.imageUrl1 || userProfile.image01})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: '#000000' }}
              >
                {userProfile.Name}, {userProfile.Age}
              </Typography>

              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => navigate('/app/edit-profile')}
                sx={{
                  color: '#EF3B5F',
                  borderColor: '#EF3B5F',
                  '&:hover': {
                    borderColor: '#d32f4f',
                    bgcolor: 'rgba(239, 59, 95, 0.04)'
                  }
                }}
              >
                Edit
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Profile Details */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>
                Height
              </Typography>
              <Typography variant="body1" sx={{ color: '#000000', mb: 2 }}>
                {userProfile.Height}
              </Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>
                Location
              </Typography>
              <Typography variant="body1" sx={{ color: '#000000', mb: 2 }}>
                {userProfile.City}, {userProfile.State}
              </Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>
                Profession
              </Typography>
              <Typography variant="body1" sx={{ color: '#000000', mb: 2 }}>
                {userProfile.Role} at {userProfile.Company}
              </Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>
                Community
              </Typography>
              <Typography variant="body1" sx={{ color: '#000000', mb: 2 }}>
                {userProfile.Subcategory}
              </Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>
                About
              </Typography>
              <Typography variant="body1" sx={{ color: '#000000' }}>
                {userProfile.Description}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<BookmarkIcon />}
          onClick={() => navigate('/app/saved-profiles')}
          sx={{
            mb: 2,
            py: 1.5,
            color: '#EF3B5F',
            borderColor: '#EF3B5F',
            '&:hover': {
              borderColor: '#d32f4f',
              bgcolor: 'rgba(239, 59, 95, 0.04)'
            }
          }}
        >
          Saved Profiles
        </Button>

        {/* Profile Status */}
        <Card sx={{ borderRadius: 3, bgcolor: '#ffffff', p: 2 }}>
          <Typography variant="body2" sx={{ color: '#666666', textAlign: 'center' }}>
            Profile Status: <strong>{userProfile.status}</strong>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default MyProfile;
