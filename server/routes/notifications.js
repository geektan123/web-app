import express from 'express';
import { admin } from '../config/firebase.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/notifications/send
 * @desc    Send push notification to a user
 * @access  Private
 */
router.post('/send', verifyToken, async (req, res) => {
  try {
    const { userId, title, body, data } = req.body;

    const messaging = admin.messaging();

    const message = {
      notification: {
        title,
        body
      },
      data: data || {},
      topic: userId
    };

    const response = await messaging.send(message);

    res.status(200).json({
      status: 'success',
      message: 'Notification sent successfully',
      messageId: response
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * @route   POST /api/notifications/subscribe
 * @desc    Subscribe user to topic
 * @access  Private
 */
router.post('/subscribe', verifyToken, async (req, res) => {
  try {
    const { token, topic } = req.body;
    const messaging = admin.messaging();

    await messaging.subscribeToTopic(token, topic);

    res.status(200).json({
      status: 'success',
      message: `Subscribed to ${topic} successfully`
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * @route   POST /api/notifications/broadcast
 * @desc    Send broadcast notification to all users
 * @access  Private (Admin only)
 */
router.post('/broadcast', verifyToken, async (req, res) => {
  try {
    const { title, body } = req.body;
    const messaging = admin.messaging();

    const message = {
      notification: {
        title,
        body
      },
      topic: 'AllUsers'
    };

    const response = await messaging.send(message);

    res.status(200).json({
      status: 'success',
      message: 'Broadcast sent successfully',
      messageId: response
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
