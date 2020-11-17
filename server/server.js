(function () {
  'use strict';

  const express = require('express');
  const app = express();
  const cors = require('cors');
  const compression = require('compression');
  const helmet = require('helmet');
  const bunyan = require('bunyan');
  const http = require('http').createServer(app);

  const log = bunyan.createLogger({ name: 'server' });
  const port = 5000;

  // Use gzip compression
  app.use(compression());

  // Parse URL-encoded and JSON bodies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Middlewares setup
  app.use(cors());
  app.use(helmet());

  // Start up server
  const server = http.listen(port, () => {
    log.info(`Rescue PH server running on port ${port}`);
  });
})();
