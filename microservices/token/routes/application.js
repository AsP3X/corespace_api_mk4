const express = require('express');

// Loading custom modules
const Logger = require('../assets/utils/logger');
const { tokenGenerator } = require('../assets/token/generator');
const { IdentGen } = require('../assets/token/generator');
const { TokenVerifier } = require('../assets/token/generator');
const { DBConnector, DBManager } = require('../assets/database/DBManager');

class Validate {
  constructor() {
    this.logger = new Logger("token/application");
    this.router = express.Router();
    this.dbc = new DBConnector();
  }

  dbConnection() {
    // Starting connection to the database
    this.dbc.createAUrl();
    this.logger.log(`Starting connection to the database...`);
    this.dbc.attemptConnection()
      .then(() => {
        this.logger.success("Database connection succeeded");
      })
      .catch((error) => {
        this.logger.log("Database connection failed");
        this.logger.error(error);
      });
  }

  rootRoute() {
    this.router.get("/", (req, res) => {
      res.send({
        message: "Create a application token by sending a POST request to /application"
      })
    });
  }

  rootPostRoute() {
    this.router.post("/", (req, res) => {
      const { application } = req.body;
      this.logger.info("Received request to create a application token");
    
      if (!application) {
        res.status(400).send({
          message: "Missing application name"
        });
      } else {
        const identGen = new IdentGen(application);
        identGen.application();
        const id = identGen.get();
    
        const tkGen = new tokenGenerator(id);
        tkGen.applicationToken();
    
        const token = tkGen.get();
    
        res.send({
          message: "Application token created",
          indentifier: token.id,
          token: token.token,
          expiresAt: token.expiresIn
        });
      }
    });
  }

  load() {
    this.dbConnection();
    this.rootRoute();
    this.rootPostRoute();
    this.logger.success("Loaded root (get/post) route successfully");
  }
}

module.exports = Validate;