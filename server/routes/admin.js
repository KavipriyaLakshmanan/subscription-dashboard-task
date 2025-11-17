const express = require('express');
const { 
  getAllSubscriptions, 
  getAllUsers, 
  getDashboardStats 
} = require('../controllers/adminController');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// All admin routes require authentication and admin role
router.use(auth, adminAuth);

// Admin dashboard stats
router.get('/dashboard-stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);

// Subscription management
router.get('/subscriptions', getAllSubscriptions);

module.exports = router;