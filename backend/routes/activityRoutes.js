
// routes/activityRoutes.js (backend)
const express = require('express');
const router = express.Router();
const { handleCustomerActivityPost, getCustomerActivity } = require('../controllers/activityController');

// POST route to handle customer activity data
router.post('/customer-activity', handleCustomerActivityPost);

// GET route to retrieve the current customer activity data
router.get('/customer-activity', getCustomerActivity);

module.exports = router;
