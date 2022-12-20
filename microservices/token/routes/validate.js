const htmlEscape = require('html-escape');
const express = require('express');

// Loading custom modules
const Logger = require('../assets/utils/logger');
const { TokenVerifier } = require('../assets/token/validator');

// Create the logger
const logger = new Logger("token/application");

// Importing router
const router = express.Router();

// Create the root product route
router.get("/", (req, res) => {
  res.send({
    message: "Validate a token by sending a POST request to /validate",
    accepted: [
      "user",
      "application"
    ]
  })
});

router.post("/", (req, res) => {
  const token = req.body.token;
  const identifier = req.body.identifier;
  logger.info("Received request to validate a token");

  if (!token || !identifier) {
    res.status(400).send({
      message: "Missing token or identifier"
    });
  } else {
    const tokenVerifier = new TokenVerifier(token);
    tokenVerifier.setId(identifier);
    tokenVerifier.validate();

    const result = tokenVerifier.get();

    // Encode the user input before sending it back in the response
    const encodedIdentifier = htmlEscape(identifier);
    const encodedToken = htmlEscape(token);

    res.send({
      message: "Token validation result",
      identifier: encodedIdentifier,
      token: encodedToken,
      valid: result
    });
  }
});

logger.success("Loaded application route");

module.exports = router;