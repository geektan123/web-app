import express from 'express';
import { getDatabase } from '../config/firebase.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/chat/send
 * @desc    Send a message
 * @access  Private
 */
router.post('/send', verifyToken, async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.userId;
    const db = getDatabase();

    const chatRoomId = [senderId, receiverId].sort().join('_');

    const messagesRef = db.ref(`messages/${chatRoomId}`);
    const newMessageRef = messagesRef.push();

    const messageData = {
      text: message,
      senderId,
      receiverId,
      timestamp: Date.now()
    };

    await newMessageRef.set(messageData);

    const senderInviteRef = db.ref(`users/${senderId}/invite/${receiverId}`);
    const receiverInviteRef = db.ref(`users/${receiverId}/invite/${senderId}`);

    const inviteData = {
      lastMessage: message,
      timestamp: Date.now()
    };

    await Promise.all([
      senderInviteRef.set(inviteData),
      receiverInviteRef.set(inviteData)
    ]);

    res.status(201).json({
      status: 'success',
      message: 'Message sent successfully',
      data: messageData
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * @route   GET /api/chat/:userId/messages
 * @desc    Get messages with a specific user
 * @access  Private
 */
router.get('/:userId/messages', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId;
    const db = getDatabase();

    const chatRoomId = [currentUserId, userId].sort().join('_');

    const messagesRef = db.ref(`messages/${chatRoomId}`);
    const snapshot = await messagesRef.once('value');

    let messages = [];

    if (snapshot.exists()) {
      const messagesData = snapshot.val();
      messages = Object.entries(messagesData)
        .map(([id, msg]) => ({ id, ...msg }))
        .sort((a, b) => a.timestamp - b.timestamp);
    }

    res.status(200).json({
      status: 'success',
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * @route   GET /api/chat/conversations
 * @desc    Get all conversations for current user
 * @access  Private
 */
router.get('/conversations', verifyToken, async (req, res) => {
  try {
    const db = getDatabase();
    const inviteRef = db.ref(`users/${req.userId}/invite`);
    const snapshot = await inviteRef.once('value');

    let conversations = [];

    if (snapshot.exists()) {
      const inviteData = snapshot.val();

      for (const [userId, chatInfo] of Object.entries(inviteData)) {
        const userRef = db.ref(`users/${userId}`);
        const userSnapshot = await userRef.once('value');

        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          conversations.push({
            userId,
            name: userData.Name,
            imageUrl: userData.imageUrl1 || userData.image01,
            lastMessage: chatInfo.lastMessage,
            timestamp: chatInfo.timestamp
          });
        }
      }

      conversations.sort((a, b) => b.timestamp - a.timestamp);
    }

    res.status(200).json({
      status: 'success',
      count: conversations.length,
      data: conversations
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

export default router;
