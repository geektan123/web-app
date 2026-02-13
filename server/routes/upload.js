import express from 'express';
import multer from 'multer';
import { getStorage } from '../config/firebase.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});
router.post('/profile-image', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No image file provided'
      });
    }
    const { imageNumber } = req.body;
    const storage = getStorage();
    const bucket = storage.bucket();
    const filename = `users/${req.userId}/${imageNumber}_${Date.now()}.jpg`;
    const file = bucket.file(filename);
    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
      public: true,
    });
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        imageUrl: publicUrl,
        filename
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
router.delete('/profile-image', verifyToken, async (req, res) => {
  try {
    const { filename } = req.body;
    const storage = getStorage();
    const bucket = storage.bucket();
    await bucket.file(filename).delete();
    res.status(200).json({
      status: 'success',
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
export default router;