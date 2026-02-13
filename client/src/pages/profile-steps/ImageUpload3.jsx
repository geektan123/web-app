import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { uploadAPI, usersAPI } from '../../services/api';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const ImageUpload3 = () => {
  const { currentUser } = useAuth();
  const { updateProfileData } = useProfile();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpload = async () => {
    if (!image) {
      navigate('/profile/complete');
      return;
    }
    try {
      setUploading(true);
      const response = await uploadAPI.uploadProfileImage(image, 'image03');
      const data = { image03: response.data.imageUrl };
      updateProfileData(data);
      await usersAPI.updateUser(currentUser.uid, data);
      navigate('/profile/complete');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Image upload failed. Continuing to next step.');
      navigate('/profile/complete');
    } finally {
      setUploading(false);
    }
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
            Upload Third Photo
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Step 13 of 14 - Third Photo
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />
          {preview ? (
            <Box
              sx={{
                width: '100%',
                height: 300,
                mb: 3,
                borderRadius: 2,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f5f5f5'
              }}
            >
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: '100%',
                height: 300,
                mb: 3,
                borderRadius: 2,
                border: '2px dashed #cccccc',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                bgcolor: '#f9f9f9',
                '&:hover': {
                  bgcolor: '#f0f0f0'
                }
              }}
              onClick={() => fileInputRef.current.click()}
            >
              <CloudUploadIcon sx={{ fontSize: 60, color: '#cccccc', mb: 2 }} />
              <Typography variant="body1" sx={{ color: '#666666' }}>
                Click to upload photo
              </Typography>
            </Box>
          )}
          {preview && (
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => fileInputRef.current.click()}
              sx={{
                mb: 2,
                color: '#EF3B5F',
                borderColor: '#EF3B5F',
                '&:hover': {
                  borderColor: '#d32f4f',
                  bgcolor: 'rgba(239, 59, 95, 0.04)'
                }
              }}
            >
              Change Photo
            </Button>
          )}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleUpload}
            disabled={uploading}
            sx={{
              bgcolor: '#EF3B5F',
              color: '#ffffff',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#d32f4f'
              },
              '&:disabled': {
                bgcolor: '#cccccc'
              }
            }}
          >
            {uploading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : (image ? 'Upload & Next' : 'Skip & Complete')}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
export default ImageUpload3;
