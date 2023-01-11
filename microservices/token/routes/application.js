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
      const { application, ownerID } = req.body;
      this.logger.info("Received request to create a application token");

      if (!application) {
        res.status(400).send({
          message: "Missing application name"
        });
        return;
      }

      if (!ownerID) {
        res.status(500).send({
          message: "Missing owner ID, access denied"
        });
        return;
      }

      const tgen = new TokenGenerator("application", { application });
      tgen.generate();
      const token = tgen.getToken();

      dbm.create({
        _id: new mongoose.Types.ObjectId(),
        name: application,
        owner: ownerID,
        token: token,
        description: "Application token",
        status: "created",
        createTimestamp: Date.now()
      }).then((result) => {
        this.logger.log("Token created successfully");
        res.send({
          message: "Application token created",
          indentifier: result.id,
          owner: result.owner,
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

  getTokenRoute() {
    const dbm = new DataManager(this.dbc, TokenModel);

    this.router.get(`/getToken/`, (req, res) => {
      const { indentifier, ownerID } = req.body;
      if (!ownerID || !indentifier) {
        res.status(500).send({
          message: "Missing owner ID or indentifier, access denied"
        });
        return;
      }

      this.logger.info(`Received request to get token with indentifier ${indentifier}`);

      dbm.read({ _id: indentifier })
        .then((result) => {
          if (result.length === 0) {
            this.logger.log("Token not found");
            res.status(404).send({
              message: "Token not found"
            });
          } else {
            this.logger.log("Token found");
            res.send({
              message: "Token found",
              token: result[0].token,
              status: result[0].status
            });
          }
        })
        .catch((error) => {
          this.logger.error(error);
          res.status(500).send({
            message: "An error occurred while getting the token",
            error: error
          });
        });
    });
  }

  load() {
    this.dbConnection();
    this.rootRoute();
    this.tokenGeneratorRoute()
    this.getTokenRoute();
  }
}

module.exports = Validate;