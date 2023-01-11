const express = require('express');
const mongoose = require('mongoose');

// Loading custom modules
const Logger = require('../assets/utils/logger');
const TokenGenerator = require('../assets/token/TokenGenerator');
const { DBConnector, DataManager } = require('../assets/database/DBManager');

// Load models
const TokenModel = require('../assets/models/token');

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

  tokenGeneratorRoute() {
    const dbm = new DataManager(this.dbc, TokenModel);

    this.router.post("/", (req, res) => {
      const { application } = req.body;
      this.logger.info("Received request to create a application token");

      if (!application) {
        res.status(400).send({
          message: "Missing application name"
        });
      }

      const tgen = new TokenGenerator("application", { application });
      tgen.generate();
      const token = tgen.getToken();

      dbm.create({
        _id: new mongoose.Types.ObjectId(),
        name: application,
        token: token,
        description: "Application token",
        status: "created",
        createTimestamp: Date.now()
      }).then((result) => {
        this.logger.log("Token created successfully");
        res.send({
          message: "Application token created",
          indentifier: result.id,
          token: result.token,
          status: result.status,
        });
      }).catch((error) => {
        this.logger.error(error);
        res.status(500).send({
          message: "An error occurred while creating the token",
          error: error
        });
      });
    });
  }

  load() {
    this.dbConnection();
    this.rootRoute();
    this.tokenGeneratorRoute()
    this.logger.success("Loaded root (get/post) route successfully");
  }
}

module.exports = Validate;