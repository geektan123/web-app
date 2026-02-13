import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { authAPI } from '../services/api';
const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const response = await authAPI.getCurrentUser();
          setUserProfile(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      try {
        await authAPI.register();
      } catch (error) {
        console.error('Registration error:', error);
      }
      return user;
    } catch (error) {
      console.error('Google Sign In Error:', error);
      throw error;
    }
  };
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Sign Out Error:', error);
      throw error;
    }
  };
  const refreshProfile = async () => {
    if (currentUser) {
      try {
        const response = await authAPI.getCurrentUser();
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error refreshing profile:', error);
      }
    }
  };
  const value = {
    currentUser,
    userProfile,
    loading,
    signInWithGoogle,
    signOut,
    refreshProfile
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};