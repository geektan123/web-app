import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { profilesAPI } from '../../services/api';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const SavedProfiles = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedProfiles();
  }, [currentUser]);

  const loadSavedProfiles = async () => {
    try {
      setLoading(true);
      const response = await profilesAPI.getSavedProfiles();
      setProfiles(response.data || []);
    } catch (error) {
      console.error('Error loading saved profiles:', error);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
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
          alignItems: 'center',
          gap: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#756568'
          }}
        >
          Saved Profiles
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ pt: 2 }}>
        {profiles.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8
            }}
          >
            <BookmarkIcon
              sx={{
                fontSize: 80,
                color: '#cccccc',
                mb: 2
              }}
            />
            <Typography variant="h6" sx={{ color: '#666666', mb: 1 }}>
              No saved profiles yet
            </Typography>
            <Typography variant="body2" sx={{ color: '#999999' }}>
              Save profiles you're interested in to view them later
            </Typography>
          </Box>
        ) : (
          profiles.map((profile) => (
            <Card
              key={profile.profileId}
              sx={{
                mb: 2,
                borderRadius: 3,
                overflow: 'hidden'
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/app/view-profile/${profile.profileId}`)}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={profile.imageUrl1 || profile.image01 || '/default-avatar.png'}
                  alt={profile.Name}
                  sx={{ objectFit: 'cover' }}
                />

                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#000000', mb: 1 }}
                  >
                    {profile.Name}, {profile.Age}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                    {profile.Height} | {profile.City}, {profile.State}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                    {profile.Role} at {profile.Company}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    {profile.Subcategory}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
};

export default SavedProfiles;
