const htmlEscape = require('html-escape');
const express = require('express');

// Loading custom modules
const Logger = require('../assets/utils/logger');
const { TokenVerifier } = require('../assets/token/validator');

class Validate {
  constructor() {
    this.logger = new Logger("token/health");
    this.router = express.Router();
  }

  rootRoute() {
    this.router.get("/", (req, res) => {
      res.send({
        message: "Validate a token by sending a POST request to /validate",
        accepted: [
          "user",
          "application"
        ]
      })
    });
  }

  rootPostRoute() {
    this.router.post("/", (req, res) => {
      const token = req.body.token;
      const identifier = req.body.identifier;
      this.logger.info("Received request to validate a token");
    
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
  }

  load() {
    this.rootRoute();
    this.rootPostRoute();
    this.logger.success("Loaded root route successfully");
  }
}

module.exports = Validate;