import express from 'express';
import { getDatabase } from '../config/firebase.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
router.get('/', verifyToken, async (req, res) => {
  try {
    const { gender, status, community, limit = 50 } = req.query;
    const db = getDatabase();
    const usersRef = db.ref('users');
    let query = usersRef;
    if (gender) {
      query = query.orderByChild('Gender').equalTo(gender);
    }
    const snapshot = await query.once('value');
    let profiles = [];
    if (snapshot.exists()) {
      const allProfiles = snapshot.val();
      profiles = Object.entries(allProfiles)
        .filter(([userId, profile]) => {
          if (userId === req.userId) return false;
          if (status && profile.status !== status) return false;
          if (community && !profile.Subcategory?.includes(community)) return false;
          return profile.active === 'enabled';
        })
        .map(([userId, profile]) => ({
          ...profile,
          profileId: userId
        }))
        .slice(0, parseInt(limit));
    }
    res.status(200).json({
      status: 'success',
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
router.get('/discover', verifyToken, async (req, res) => {
  try {
    const db = getDatabase();
    const currentUserRef = db.ref(`users/${req.userId}`);
    const currentUserSnapshot = await currentUserRef.once('value');
    if (!currentUserSnapshot.exists()) {
      return res.status(404).json({
        status: 'error',
        message: 'Current user not found'
      });
    }
    const currentUser = currentUserSnapshot.val();
    const oppositeGender = currentUser.Gender === 'Male' ? 'Female' : 'Male';
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');
    let profiles = [];
    if (snapshot.exists()) {
      const allUsers = snapshot.val();
      profiles = Object.entries(allUsers)
        .filter(([userId, profile]) => {
          return (
            userId !== req.userId &&
            profile.Gender === oppositeGender &&
            (profile.status === 'Registered' || profile.status === 'Completed') &&
            profile.active === 'enabled'
          );
        })
        .map(([userId, profile]) => ({
          ...profile,
          profileId: userId
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 50);
    }
    res.status(200).json({
      status: 'success',
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
router.post('/:profileId/save', verifyToken, async (req, res) => {
  try {
    const { profileId } = req.params;
    const db = getDatabase();
    const savedRef = db.ref(`users/${req.userId}/savedProfiles/${profileId}`);
    await savedRef.set(true);
    res.status(200).json({
      status: 'success',
      message: 'Profile saved successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
router.delete('/:profileId/save', verifyToken, async (req, res) => {
  try {
    const { profileId } = req.params;
    const db = getDatabase();
    const savedRef = db.ref(`users/${req.userId}/savedProfiles/${profileId}`);
    await savedRef.remove();
    res.status(200).json({
      status: 'success',
      message: 'Profile unsaved successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
router.get('/saved', verifyToken, async (req, res) => {
  try {
    const db = getDatabase();
    const savedRef = db.ref(`users/${req.userId}/savedProfiles`);
    const snapshot = await savedRef.once('value');
    let savedProfiles = [];
    if (snapshot.exists()) {
      const savedIds = Object.keys(snapshot.val());
      for (const profileId of savedIds) {
        const profileRef = db.ref(`users/${profileId}`);
        const profileSnapshot = await profileRef.once('value');
        if (profileSnapshot.exists()) {
          savedProfiles.push({
            ...profileSnapshot.val(),
            profileId
          });
        }
      }
    }
    res.status(200).json({
      status: 'success',
      count: savedProfiles.length,
      data: savedProfiles
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
export default router;