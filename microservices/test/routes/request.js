const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Loading custom modules
const Logger = require('../assets/utils/logger');

// Create the logger
const logger = new Logger("testing/request");

// Importing router
const router = express.Router();

async function createRequest() {
  return axios.get('http://localhost:3000/token/health')
  .then(response => {
    return response.data;
    // console.log(response.data.url);
    // console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
} 

async function postRequest(url, data) {
  return axios.post(url, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });
}

// Create the root product route
router.get("/", async (req, res) => {
  const result = await postRequest("http://localhost:3000/token/application", {application: "testing"});
  res.status(200).json({
    healthy: true,
    data: result,
    uptime: process.uptime()
  });
});

router.get("/test", async (req, res) => {
  const result = await createRequest("http://localhost:3000/token/validate", {token: "testing", indentifier: req.body.indentifier});
  res.status(200).json({
    data: result
  });
});

logger.success("Loaded request route");

module.exports = router;