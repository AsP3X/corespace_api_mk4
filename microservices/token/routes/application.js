const express = require('express');

// Loading custom modules
const Logger = require('../assets/utils/logger');

// Create the logger
const logger = new Logger("token/application");

// Importing router
const router = express.Router();

// Create the root product route
router.get("/", (req, res) => {
  res.send({
    message: "create a token using a post request to "
  })
});

logger.success("Loaded application route");

module.exports = router;