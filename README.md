# subscription-dashboard-task
# Subscription Dashboard Task

A full-stack subscription management dashboard with admin and user roles, built with React.js frontend and Node.js backend.

##  Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling and UI components
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

##  Project Structure
subscription-dashboard-task/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend Node.js application
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Database configuration
│   └── package.json
└── README.md

## Backend Setup

cd server
npm install

# Create environment file
cp .env.example .env

# Update .env with your configurations
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

## Frontend Setup

cd ../client
npm install

# Create environment file
cp .env.example .env

# Update .env with your configurations
VITE_API_BASE_URL=http://localhost:5000/api

## API Endpoints

## Authentication
POST - > /api/auth/register - User registration
POST - > /api/auth/login - User login
GET  - > /api/auth/me - Get current use


## Contact details

- Name : Kavipriya L
- Email : kavininfotechit@gmail.com
- Phone No: 6374723428
