const bunyan = require('bunyan');
const path   = require('path');

const isEmpty = require(path.join(__dirname, '../utils/isEmpty'));

const { Rescue } = require(path.join(__dirname, '../models/'));

const log = bunyan.createLogger({ name: 'rescue' });

module.exports = {

  // Get all rescues
  getRescues: (req, res, next) => {
    Rescue.find()
      .then((rescues) => {
        res.status(200).send(rescues);
      })
      .catch((err) => {
        log.error(err);
        res.send(err);
      })
  },

}
