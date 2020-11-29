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
