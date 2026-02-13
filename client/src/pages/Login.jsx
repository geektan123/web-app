import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#FFE0E7',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          {/* Logo/Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#756568',
              mb: 1,
              fontFamily: 'serif'
            }}
          >
            Jain Maitri
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#666666',
              mb: 4
            }}
          >
            Matrimonial app for the Jain community
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Sign In Info */}
          <Typography
            variant="h6"
            sx={{
              color: '#000000',
              mb: 2,
              fontWeight: 500
            }}
          >
            Welcome Back!
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              mb: 4
            }}
          >
            Sign in to find your perfect match
          </Typography>

          {/* Google Sign In Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            disabled={loading}
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
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </Button>

          {/* Terms & Privacy */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: '#999999',
              mt: 3,
              fontSize: '0.75rem'
            }}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
