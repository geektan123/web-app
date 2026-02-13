import express from 'express';
import { getDatabase } from '../config/firebase.js';
import { verifyToken, checkOwnership } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/users/:userId
 * @desc    Get user profile by ID
 * @access  Private
 */
router.get('/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const db = getDatabase();
    const userRef = db.ref(`users/${userId}`);
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

/**
 * @route   PUT /api/users/:userId
 * @desc    Update user profile
 * @access  Private (Own profile only)
 */
router.put('/:userId', verifyToken, checkOwnership, async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    const db = getDatabase();
    const userRef = db.ref(`users/${userId}`);

    await userRef.update(updates);

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * @route   DELETE /api/users/:userId
 * @desc    Delete user account
 * @access  Private (Own profile only)
 */
router.delete('/:userId', verifyToken, checkOwnership, async (req, res) => {
  try {
    const { userId } = req.params;
    const db = getDatabase();
    const auth = getAuth();

    await db.ref(`users/${userId}`).remove();
    await auth.deleteUser(userId);

    res.status(200).json({
      status: 'success',
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
