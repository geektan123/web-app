import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';

import Launcher from './pages/Launcher';
import Login from './pages/Login';
import ProfileCreation from './pages/ProfileCreation';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

import Name from './pages/profile-steps/Name';
import DateOfBirth from './pages/profile-steps/DateOfBirth';
import Cast from './pages/profile-steps/Cast';
import Location from './pages/profile-steps/Location';
import Description from './pages/profile-steps/Description';
import Income from './pages/profile-steps/Income';
import Education from './pages/profile-steps/Education';
import Interests from './pages/profile-steps/Interests';
import FamilyInfo1 from './pages/profile-steps/FamilyInfo1';
import FamilyInfo2 from './pages/profile-steps/FamilyInfo2';
import ImageUpload1 from './pages/profile-steps/ImageUpload1';
import ImageUpload2 from './pages/profile-steps/ImageUpload2';
import ImageUpload3 from './pages/profile-steps/ImageUpload3';
import VerificationComplete from './pages/profile-steps/VerificationComplete';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProfileProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Launcher />} />
              <Route path="/login" element={<Login />} />

              {/* Profile Creation Flow */}
              <Route path="/profile/account-type" element={<ProtectedRoute><ProfileCreation /></ProtectedRoute>} />
              <Route path="/profile/name" element={<ProtectedRoute><Name /></ProtectedRoute>} />
              <Route path="/profile/dob" element={<ProtectedRoute><DateOfBirth /></ProtectedRoute>} />
              <Route path="/profile/cast" element={<ProtectedRoute><Cast /></ProtectedRoute>} />
              <Route path="/profile/location" element={<ProtectedRoute><Location /></ProtectedRoute>} />
              <Route path="/profile/description" element={<ProtectedRoute><Description /></ProtectedRoute>} />
              <Route path="/profile/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
              <Route path="/profile/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
              <Route path="/profile/interests" element={<ProtectedRoute><Interests /></ProtectedRoute>} />
              <Route path="/profile/family-info-1" element={<ProtectedRoute><FamilyInfo1 /></ProtectedRoute>} />
              <Route path="/profile/family-info-2" element={<ProtectedRoute><FamilyInfo2 /></ProtectedRoute>} />
              <Route path="/profile/image-1" element={<ProtectedRoute><ImageUpload1 /></ProtectedRoute>} />
              <Route path="/profile/image-2" element={<ProtectedRoute><ImageUpload2 /></ProtectedRoute>} />
              <Route path="/profile/image-3" element={<ProtectedRoute><ImageUpload3 /></ProtectedRoute>} />
              <Route path="/profile/complete" element={<ProtectedRoute><VerificationComplete /></ProtectedRoute>} />

              {/* Main App Routes */}
              <Route path="/app/*" element={<ProtectedRoute><MainLayout /></ProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
