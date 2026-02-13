import { auth, storage } from '../config/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get authentication token
 */
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  return await user.getIdToken();
};

/**
 * Make authenticated API request
 */
const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const authAPI = {
  verifyToken: () => apiRequest('/auth/verify', { method: 'POST' }),

  register: () => apiRequest('/auth/register', { method: 'POST' }),

  getCurrentUser: () => apiRequest('/auth/me'),
};

export const usersAPI = {
  getUser: (userId) => apiRequest(`/users/${userId}`),

  updateUser: (userId, data) => apiRequest(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  deleteUser: (userId) => apiRequest(`/users/${userId}`, {
    method: 'DELETE',
  }),
};

export const profilesAPI = {
  getAllProfiles: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/profiles?${queryString}`);
  },

  getDiscoverProfiles: () => apiRequest('/profiles/discover'),

  getSavedProfiles: () => apiRequest('/profiles/saved'),

  saveProfile: (profileId) => apiRequest(`/profiles/${profileId}/save`, {
    method: 'POST',
  }),

  unsaveProfile: (profileId) => apiRequest(`/profiles/${profileId}/save`, {
    method: 'DELETE',
  }),
};

export const chatAPI = {
  sendMessage: (receiverId, message) => apiRequest('/chat/send', {
    method: 'POST',
    body: JSON.stringify({ receiverId, message }),
  }),

  getMessages: (userId) => apiRequest(`/chat/${userId}/messages`),

  getConversations: () => apiRequest('/chat/conversations'),
};

export const uploadAPI = {
  uploadProfileImage: async (imageFile, imageNumber) => {
    return {
      status: 'skipped',
      message: 'Upload skipped',
      data: null,
    };
  },

  deleteProfileImage: async (filename) => {
    try {
      if (!filename) throw new Error('Filename is required');
      await deleteObject(ref(storage, filename));
      return {
        status: 'success',
        message: 'Image deleted successfully',
      };
    } catch (error) {
      console.error('Delete upload error:', error);
      throw error;
    }
  },
};

export const notificationsAPI = {
  sendNotification: (userId, title, body, data) => apiRequest('/notifications/send', {
    method: 'POST',
    body: JSON.stringify({ userId, title, body, data }),
  }),

  subscribeToTopic: (token, topic) => apiRequest('/notifications/subscribe', {
    method: 'POST',
    body: JSON.stringify({ token, topic }),
  }),

  broadcast: (title, body) => apiRequest('/notifications/broadcast', {
    method: 'POST',
    body: JSON.stringify({ title, body }),
  }),
};

export default {
  auth: authAPI,
  users: usersAPI,
  profiles: profilesAPI,
  chat: chatAPI,
  upload: uploadAPI,
  notifications: notificationsAPI,
};
