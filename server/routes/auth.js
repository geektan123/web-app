import express from 'express';
import { getAuth, getDatabase } from '../config/firebase.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
router.post('/verify', verifyToken, async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Token verified successfully',
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
router.post('/register', verifyToken, async (req, res) => {
  try {
    const { email } = req.user;
    const db = getDatabase();
    const userRef = db.ref(`users/${req.userId}`);
    const snapshot = await userRef.once('value');
    if (!snapshot.exists()) {
      await userRef.set({
        profileId: req.userId,
        email: email,
        status: 'New',
        active: 'enabled',
        createdAt: new Date().toISOString()
      });
    }
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      userId: req.userId
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
router.get('/me', verifyToken, async (req, res) => {
  try {
    const db = getDatabase();
    const userRef = db.ref(`users/${req.userId}`);
    const snapshot = await userRef.once('value');
    if (!snapshot.exists()) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: snapshot.val()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
export default router;