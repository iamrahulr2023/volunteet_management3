const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const { exportReport } = require('../controllers/reportController');

router.get('/export', auth, adminOnly, exportReport);

module.exports = router;
