import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Button
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import RefreshIcon from '@mui/icons-material/Refresh';

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedProfiles, setSavedProfiles] = useState([]);

  useEffect(() => {
    loadProfiles();
    loadSavedProfiles();
  }, [currentUser]);

  const loadSavedProfiles = async () => {
    try {
      const response = await profilesAPI.getSavedProfiles();
      const savedIds = response.data.map(p => p.profileId);
      setSavedProfiles(savedIds);
    } catch (error) {
      console.error('Error loading saved profiles:', error);
    }
  };

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const response = await profilesAPI.getDiscoverProfiles();
      setProfiles(response.data);
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveProfile = async (profileId) => {
    try {
      if (savedProfiles.includes(profileId)) {
        await profilesAPI.unsaveProfile(profileId);
        setSavedProfiles(savedProfiles.filter(id => id !== profileId));
      } else {
        await profilesAPI.saveProfile(profileId);
        setSavedProfiles([...savedProfiles, profileId]);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: '#EF3B5F' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFE0E7', pb: 2 }}>
      <Container maxWidth="md" sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#756568' }}>
            Discover
          </Typography>
          <IconButton onClick={loadProfiles} sx={{ color: '#EF3B5F' }}>
            <RefreshIcon />
          </IconButton>
        </Box>

        {profiles.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#666666' }}>
              No profiles found
            </Typography>
          </Box>
        ) : (
          profiles.map((profile) => (
            <Card key={profile.profileId} sx={{ mb: 2, borderRadius: 3, overflow: 'hidden' }}>
              <CardActionArea onClick={() => navigate(`/app/view-profile/${profile.profileId}`)}>
                <CardMedia
                  component="img"
                  height="300"
                  image={profile.imageUrl1 || profile.image01 || '/default-avatar.png'}
                  alt={profile.Name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#000000' }}>
                      {profile.Name}, {profile.Age}
                    </Typography>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveProfile(profile.profileId);
                      }}
                      sx={{ color: '#EF3B5F' }}
                    >
                      {savedProfiles.includes(profile.profileId) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                    {profile.Height} | {profile.City}, {profile.State}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                    {profile.Role} at {profile.Company}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
                    {profile.Subcategory}
                  </Typography>
                  {profile.Interest1 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {[profile.Interest1, profile.Interest2, profile.Interest3]
                        .filter(Boolean)
                        .map((interest, idx) => (
                          <Box key={idx} sx={{ bgcolor: '#f0f0f0', px: 1.5, py: 0.5, borderRadius: 2, fontSize: '0.75rem' }}>
                            {interest}
                          </Box>
                        ))}
                    </Box>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
};

export default Home;
