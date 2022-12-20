const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Loading custom modules
const Logger = require('../assets/utils/logger');

// Loading middleware
const tokenHandler = require('../assets/networking/tokenHandler');

// Create the logger
const logger = new Logger("register/register");

// Importing router
const router = express.Router();

router.use(tokenHandler);

// Create the root product route
router.get("/", (req, res) => {
  res.status(200).json({
    healthy: true,
    uptime: process.uptime()
  });
});

logger.success("Loaded register route");

module.exports = router;