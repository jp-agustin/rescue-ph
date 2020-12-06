const bunyan = require('bunyan');
const path = require('path');

const isEmpty = require(path.join(__dirname, '../utils/isEmpty'));

const { Rescue, Update } = require(path.join(__dirname, '../models/'));

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
  addNewRescue: (req, res, io) => {
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

  // Update rescue entry
  updateRescue: (req, res, io) => {
    const { id } = req.params;
    const { body } = req;

    // no-restricted-syntax is ignored in this case since although array iterations are favored
    // more than loops, there are still cases where loops are more preferred (i.e. when you want to break or continue)
    /* eslint-disable-next-line no-restricted-syntax */
    for (const key of Object.keys(body)) {
      if (isEmpty(body[key])) {
        return res.status(400).send({ error: 'Parameters cannot be empty' });
      }
    }

    Rescue.findByIdAndUpdate(id, req.body, { new: true })
      .then((updatedRescue) => {
        res.status(200).send({ message: 'Rescue entry successully updated' });
        io.emit('update-rescue', updatedRescue);
      })
      .catch((err) => {
        log.error(err);
        res.send(err);
      });

    return true;
  },

  // Get rescue updates
  getUpdates: (req, res) => {
    const { id } = req.params;

    const getUpdates = (rescue) => {
      if (!isEmpty(rescue)) {
        Update.find({ rescueId: rescue._id })
          .sort({ timestamp: 'asc' })
          .then((updates) => res.status(200).send(updates))
          .catch((err) => {
            log.error(err);
            res.send(err);
          });

        return true;
      }
      return res.status(404).send({ error: 'Rescue not found' });
    };

    Rescue.findById(id)
      .then(getUpdates)
      .catch((err) => {
        log.error(err);
        res.send(err);
      });
  },

  // Add new rescue update
  addNewUpdate: (req, res) => {
    const { id } = req.params;
    const { update } = req.body;

    if (isEmpty(update)) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    const returnUpdates = () => {
      Update.find({ rescueId: id })
        .sort({ timestamp: 'asc' })
        .then((updates) => res.status(200).send(updates))
        .catch((err) => {
          log.error(err);
          res.send(err);
        });

      return true;
    };

    const addUpdate = (rescue) => {
      if (!isEmpty(rescue)) {
        const newEntry = new Update({
          rescueId: rescue._id,
          update,
          timestamp: new Date(),
        });

        newEntry
          .save()
          .then(returnUpdates)
          .catch((err) => {
            log.error(err);
            res.send(err);
          });

        return true;
      }
      return res.status(404).send({ error: 'Rescue not found' });
    };

    Rescue.findById(id)
      .then(addUpdate)
      .catch((err) => {
        log.error(err);
        res.send(err);
      });

    return true;
  },
};
