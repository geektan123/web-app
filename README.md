# Jain Maitri - Matrimonial Web Application

## Overview

Jain Maitri is a full-stack matrimonial (matchmaking) web application designed specifically for the Jain community. The platform enables users to create detailed profiles, discover potential matches, communicate through real-time messaging, and manage their preferences through an intuitive interface.

This project was originally developed as an Android native application and has been completely refactored into a modern web application using the MERN-inspired stack with Firebase.

## Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library with hooks
- **Vite 5.0.8** - Fast development build tool
- **Material-UI (MUI) 5.15.0** - Professional component library
- **React Router v6** - Client-side routing
- **Firebase Client SDK 10.7.1** - Authentication and real-time data
- **Additional Libraries**: date-fns, react-image-crop

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 4.18.2** - Web application framework
- **Firebase Admin SDK 12.0.0** - Server-side Firebase operations
- **Security**: helmet, cors, express-rate-limit
- **Utilities**: morgan (logging), multer (file uploads)

### Database & Services
- **Firebase Realtime Database** - NoSQL real-time data storage
- **Firebase Authentication** - User authentication and authorization
- **Firebase Cloud Storage** - Image and media storage

## Primary Languages

- **JavaScript/JSX** (Frontend & Backend)
- **HTML/CSS** (Markup & Styling)

## Repository Statistics

- **Total Files**: 50+ source files (excluding node_modules)
- **Lines of Code**: ~8,000+ LOC across client and server
- **Directories**: 15+ directories
- **Source**: Refactored from private Android project (never made public)

## Project Structure

```
JainShaadi/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── config/         # Firebase and app configuration
│   │   ├── context/        # React Context (Auth, Profile)
│   │   ├── layouts/        # Page layout components
│   │   ├── pages/          # Route-based page components
│   │   ├── services/       # API service layer
│   │   └── theme/          # MUI theme configuration
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express backend API
│   ├── config/             # Server configuration
│   ├── middleware/         # Custom middleware (auth, etc.)
│   ├── routes/             # API route handlers
│   │   ├── auth.js         # Authentication endpoints
│   │   ├── profiles.js     # Profile CRUD operations
│   │   ├── chat.js         # Messaging endpoints
│   │   ├── users.js        # User management
│   │   ├── notifications.js # Push notifications
│   │   └── upload.js       # File upload handling
│   ├── server.js           # Main application entry
│   └── package.json
│
├── package.json           # Root package.json (monorepo scripts)
└── README.md              # This file
```

## Key Features

### User Management
- Email/password authentication via Firebase
- Multi-step profile creation (13 steps)
- Profile photo uploads (up to 3 images)
- Profile editing and management
- Account verification status

### Profile Discovery
- Browse profiles with advanced filters (gender, community, status)
- Random profile discovery (opposite gender)
- Save/bookmark favorite profiles
- Profile search functionality

### Messaging
- Real-time chat system
- Chat list with conversation previews
- Individual chat conversations
- Message notifications

### User Preferences
- Community/caste preferences
- Income and education filters
- Location-based searching
- Interest matching
- Family information display

## Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Firebase Account** with project setup

## Environment Setup

### Client Environment Variables

Create `client/.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:5000/api
```

### Server Environment Variables

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Firebase Admin SDK (from service account JSON)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
```

## Installation & Running

### Install Dependencies

```bash
# Install all dependencies (client + server)
npm run install:all

# Or install separately
cd client && npm install
cd ../server && npm install
```

### Development Mode

```bash
# Run both client and server (from root)
npm run client    # Starts React dev server on port 3000
npm run server    # Starts Express server on port 5000

# Or run separately
cd client && npm run dev
cd server && npm run dev
```

### Production Build

```bash
# Build client for production
npm run build:client

# Run server in production mode
npm run start:server
```


## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user profile
- `POST /api/auth/verify` - Verify Firebase token
- `GET /api/auth/me` - Get current user info

### Profiles
- `GET /api/profiles` - Browse profiles (with filters)
- `GET /api/profiles/discover` - Get random opposite-gender profiles
- `POST /api/profiles/:id/save` - Save/bookmark a profile
- `DELETE /api/profiles/:id/save` - Unsave a profile
- `GET /api/profiles/saved` - Get user's saved profiles

### Chat
- `GET /api/chat` - Get user's chat list
- `POST /api/chat` - Send a message
- `GET /api/chat/:chatId` - Get specific conversation

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `PATCH /api/users/:id/status` - Update profile visibility

## Development Notes

- **Hot Reload**: Both client (Vite) and server (Nodemon) support hot reload during development
- **CORS**: Configured to allow localhost:3000-3002 in development
- **Rate Limiting**: API endpoints are rate-limited (100 requests per 15 minutes)
- **Authentication**: All protected routes require valid Firebase ID token in Authorization header

## Testing

Project-specific automated test wrapper has been removed from this repository.

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Realtime Database with rules:
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth.uid === $uid"
      }
    },
    "profiles": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```
4. Enable Cloud Storage
5. Download service account key for server
6. Configure environment variables

## Security

- All passwords are handled by Firebase Authentication
- API routes are protected with token verification middleware
- File uploads are validated and sanitized
- Rate limiting prevents abuse
- CORS is strictly configured
- Helmet.js adds security headers

## Contributing

This project is part of Project Puzzle for IDE Arena evaluation. It is a private repository and not open for public contributions.

## License

Private - All Rights Reserved

## Author

Created for Project Puzzle - IDE Arena Dataset

---

**Note**: This repository is designed to work with the IDE Arena evaluation framework. Each task will have its own test suite located in the `tasks/` directory.
