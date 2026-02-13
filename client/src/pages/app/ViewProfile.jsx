import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usersAPI, profilesAPI } from '../../services/api';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatIcon from '@mui/icons-material/Chat';

const ViewProfile = () => {
  const { profileId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadProfile();
    checkIfSaved();
  }, [profileId]);

  const loadProfile = async () => {
    try {
      const response = await usersAPI.getUser(profileId);
      setProfile(response.data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfSaved = async () => {
    try {
      const response = await profilesAPI.getSavedProfiles();
      const savedProfiles = response.data || [];
      const isSavedProfile = savedProfiles.some(p => p.profileId === profileId);
      setIsSaved(isSavedProfile);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const toggleSave = async () => {
    try {
      if (isSaved) {
        await profilesAPI.unsaveProfile(profileId);
        setIsSaved(false);
      } else {
        await profilesAPI.saveProfile(profileId);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  const handleSendMessage = () => {
    navigate(`/app/chat/${profileId}`);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#FFE0E7"
      >
        <CircularProgress sx={{ color: '#EF3B5F' }} />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#FFE0E7"
      >
        <Typography>Profile not found</Typography>
      </Box>
    );
  }

  const images = [profile.imageUrl1 || profile.image01, profile.image02, profile.image03].filter(Boolean);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#FFE0E7',
        pb: 2
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: '#ffffff',
          zIndex: 10,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        <IconButton onClick={toggleSave} sx={{ color: '#EF3B5F' }}>
          {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Box>

      <Container maxWidth="md" sx={{ pt: 2 }}>
        {/* Image Carousel */}
        <Card sx={{ mb: 2, borderRadius: 3, overflow: 'hidden' }}>
          <Box
            sx={{
              height: 400,
              backgroundImage: `url(${images[currentImageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}
          >
            {/* Image indicators */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1
              }}
            >
              {images.map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: currentImageIndex === idx ? '#EF3B5F' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          </Box>
        </Card>

        {/* Profile Details */}
        <Card sx={{ mb: 2, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#000000', mb: 2 }}>
              {profile.Name}, {profile.Age}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>Height</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{profile.Height}</Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>Location</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{profile.City}, {profile.State}</Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>Profession</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{profile.Role} at {profile.Company}</Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>Income</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{profile.IncomeRange}</Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>Community</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{profile.Subcategory}</Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>Education</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{profile.Degree} from {profile.College}</Typography>

              <Typography variant="subtitle2" sx={{ color: '#999999', mb: 0.5 }}>About</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{profile.Description}</Typography>

              {profile.Interest1 && (
                <>
                  <Typography variant="subtitle2" sx={{ color: '#999999', mb: 1 }}>Interests</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {[profile.Interest1, profile.Interest2, profile.Interest3, profile.Interest4, profile.Interest5, profile.Interest6]
                      .filter(Boolean)
                      .map((interest, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            bgcolor: '#f0f0f0',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            fontSize: '0.875rem'
                          }}
                        >
                          {interest}
                        </Box>
                      ))}
                  </Box>
                </>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Send Message Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<ChatIcon />}
          onClick={handleSendMessage}
          sx={{
            bgcolor: '#EF3B5F',
            color: '#ffffff',
            py: 1.5,
            mb: 2,
            '&:hover': {
              bgcolor: '#d32f4f'
            }
          }}
        >
          Send Message
        </Button>
      </Container>
    </Box>
  );
};

export default ViewProfile;
