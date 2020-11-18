(function () {
  'use strict';

  const express     = require('express');
  const app         = express();
  const cors        = require('cors');
  const compression = require('compression');
  const helmet      = require('helmet');
  const bunyan      = require('bunyan');
  const http        = require('http').createServer(app);
  const mongoose    = require('mongoose');
  const path        = require('path');

  const log   = bunyan.createLogger({ name: 'server' });
  const port  = 5000;

  // Use gzip compression
  app.use(compression());

  // Parse URL-encoded and JSON bodies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Middlewares setup
  app.use(cors());
  app.use(helmet());

  // Load models
  const models = require(path.join(__dirname, './models/'));

  // MongoDB config
  const db = process.env.MONGO_URI;
  const user = process.env.MONGO_INITDB_ROOT_USERNAME;
  const pw = process.env.MONGO_INITDB_ROOT_PASSWORD;

  let dbOptions = {
    auth: {
      user,
      password: pw,
    },
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }

  // Connect to DB
  mongoose.connect(db, dbOptions)
    .then(() => {
      log.info('Database connection successful...');

      const server = http.listen(port, () => {
        log.info(`Rescue PH server running on port ${port}`);

        // Comment out to load dummy data
        // require(path.join(__dirname, './utils/', 'loadDummy.js'))();
      });

      server.setTimeout(0);
    })
    .catch(err => log.error(err));

  // Bind connection to error event (to get notification of connection errors)
  const conn = mongoose.connection;
  conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
})();
