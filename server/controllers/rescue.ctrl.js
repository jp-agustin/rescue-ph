const bunyan = require('bunyan');
const path = require('path');

const isEmpty = require(path.join(__dirname, '../utils/isEmpty'));

const { Rescue } = require(path.join(__dirname, '../models/'));

const log = bunyan.createLogger({ name: 'rescue' });

module.exports = {
  // Get all rescues
  getRescues: (req, res) => {
    Rescue.find()
      .then((rescues) => res.status(200).send(rescues))
      .catch((err) => {
        log.error(err);
        res.send(err);
      });
  },

  // Create new rescue entry
  addNewRescue: (req, res, next, io) => {
    const rescue = req.body;
    const {
      contactPerson, contactNumber, location, noOfPerson,
    } = rescue;

    if (
      isEmpty(contactPerson)
      || isEmpty(contactNumber)
      || isEmpty(location)
      || isEmpty(noOfPerson)
      || (isEmpty(location.address) && (isEmpty(location.lat) || isEmpty(location.lon)))
    ) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    const newEntry = new Rescue(rescue);

    newEntry
      .save()
      .then((createdRescue) => {
        res.send({ message: 'Rescue entry successfully added' });
        io.emit('new-rescue', createdRescue);
      })
      .catch((err) => {
        log.error(err);
        res.send(err);
      });

    return true;
  },
};
