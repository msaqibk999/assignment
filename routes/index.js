const express = require('express');
const router = express.Router();

const itemRoutes = require('./itemRoutes');
const billRoutes = require('./billRoutes');

router.use('/items', itemRoutes);
router.use('/bills', billRoutes);

module.exports = router;
