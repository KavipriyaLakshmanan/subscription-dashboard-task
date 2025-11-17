const express = require('express');
const { subscribe, getMySubscription } = require('../controllers/subscriptionController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/subscribe/:planId', auth, subscribe);
router.get('/my-subscription', auth, getMySubscription);

module.exports = router;