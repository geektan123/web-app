import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
let firebaseApp;
let db;
let auth;
let storage;
export const initializeFirebase = () => {
  try {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
    });
    db = admin.database();
    auth = admin.auth();
    storage = admin.storage();
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
};
export const getDatabase = () => {
  if (!db) throw new Error('Database not initialized');
  return db;
};
export const getAuth = () => {
  if (!auth) throw new Error('Auth not initialized');
  return auth;
};
export const getStorage = () => {
  if (!storage) throw new Error('Storage not initialized');
  return storage;
};
export { admin };
