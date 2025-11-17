const express = require('express');
const { register, login, refreshToken, createAdmin } = require('../controllers/authController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

// Admin-only route to create other admins
router.post('/create-admin', auth, adminAuth, createAdmin);

module.exports = router;