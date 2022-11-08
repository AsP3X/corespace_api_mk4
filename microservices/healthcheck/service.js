const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Loading custom modules
const getAllRoutes = require('./assets/utils/getAllRoutes');
const Logger = require('./assets/utils/logger');

// Create the logger
const logger = new Logger("healthcheck");

logger.info("Booting up healthcheck microservice...");

// Load environment variables from .env file and creating the service
const service = express();
dotenv.config();

// get run arguments
const args = process.argv.slice(2);

// Load configuration
const PORT = process.env.PORT || 3000;
const ROUTES_PATH = path.join(__dirname, `routes`);
let RunMode = 'dev';


// #############################################################################
// ##################          Load all Middlewares ############################
// #############################################################################
logger.info("Loading middlewares...");
// Add middleware to parse the body of the request
service.use(express.json());
service.use(express.urlencoded({ extended: true }));

// setting allowed headers
service.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS);
  res.header('Access-Control-Allow-Headers', process.env.ALLOWED_HEADERS);
  res.header('Access-Control-Allow-Methods', process.env.ALLOWED_METHODS_X);

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', process.env.ALLOWED_METHODS);
    return res.status(200).json({});
  }

  next();
});

// -;-

// #############################################################################
// ##################      Load all Routes     #################################
// #############################################################################
const apiRoutes = getAllRoutes(ROUTES_PATH);
const apiRouteKeys = Object.keys(apiRoutes)

logger.warn(`Found ${apiRouteKeys.length} routes`);
logger.info("Beginnig to load routes...");

apiRouteKeys.forEach(key => {
  // const subRoutes = apiRoutes[key];
  // subRoutes.forEach(route => {
  //   const routePath = path.join(ROUTES_PATH, key, route);
  //   const routeName = `${key}`;
  //   const routeHandler = require(routePath);
  //   service.use(`/${routeName}`, routeHandler);
  // })
  const routePath = path.join(ROUTES_PATH, apiRoutes[key]);
  const routeName = `${apiRoutes[key]}`;
  const routeHandler = require(routePath);
  service.use(`/${routeName}`, routeHandler);
});
logger.success("Route loading complete!");
// -;-

service.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: (error.status || 500)
    }
  });
});

service.listen(PORT || 3000, () => {
  logger.info(`running on port ${PORT}`);
});