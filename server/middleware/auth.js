import { getAuth } from '../config/firebase.js';

/**
 * Middleware to verify Firebase ID token
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const token = authHeader.split('Bearer ')[1];
    const auth = getAuth();

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    req.userId = decodedToken.uid;

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({
      status: 'error',
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to check if user owns the resource
 */
export const checkOwnership = (req, res, next) => {
  const { userId } = req.params;

  if (req.userId !== userId) {
    return res.status(403).json({
      status: 'error',
      message: 'You do not have permission to access this resource'
    });
  }

  next();
};
