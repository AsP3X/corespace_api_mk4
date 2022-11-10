const express = require('express');
const dotenv = require('dotenv');

const routename = "token";

// Load environment variables
dotenv.config();

// Loading custom modules
const Logger = require('../assets/utils/logger');
const ApiRequest = require('../assets/utils/apiRequest');

// Create the logger
const logger = new Logger(`healthcheck/${routename}`);

// Importing router
const router = express.Router();

async function getAPIRequest(url) {
  const apiRequest = new ApiRequest(url);
  return apiRequest.get();
} 

// Create the root product route
router.get("/", async (req, res) => {
  logger.log(`GET ${process.env.token_address}`);
  const result = await getAPIRequest(process.env.token_address);
  res.send(result);
});

logger.success(`Loaded ${routename} route`);

module.exports = router;