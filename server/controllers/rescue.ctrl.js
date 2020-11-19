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
        res.send(rescues);
      })
      .catch((err) => {
        log.error(err);
        res.send(err);
      })
  },

  // Create new rescue entry
  addNewRescue: (req, res, next, io) => {
    let rescue = req.body;
    let newEntry = new Rescue(rescue);

    newEntry.save()
      .then((createdRescue) => {
        res.send({ message: 'Rescue entry successfully added' });
        io.emit('new-rescue', createdRescue);
      })
      .catch((err) => {
        log.error(err);
        res.send(err);
      });
  },

}
