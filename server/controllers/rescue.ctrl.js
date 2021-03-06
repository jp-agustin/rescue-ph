const bunyan = require('bunyan');
const path = require('path');

const { isEmpty, isValidRescue } = require(path.join(__dirname, '../utils/helpers'));

const { RescueModel, UpdateModel } = require(path.join(__dirname, '../models/'));

const log = bunyan.createLogger({ name: 'rescue' });

module.exports = {
  // Get all rescues
  getRescues: (req, res) => {
    RescueModel.find()
      .then((rescues) => res.status(200).send(rescues))
      .catch((err) => {
        log.error(err);
        res.send(err);
      });
  },

  // Create new rescue entry
  addNewRescue: (req, res, io) => {
    const rescue = req.body;

    if (!isValidRescue(rescue)) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    const newEntry = new RescueModel(rescue);

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

  // Get rescue updates
  getUpdates: (req, res) => {
    const { id } = req.params;

    const getUpdates = (rescue) => {
      if (!isEmpty(rescue)) {
        UpdateModel.find({ rescueId: rescue._id })
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

    RescueModel.findById(id)
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
      UpdateModel.find({ rescueId: id })
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
        const newEntry = new UpdateModel({
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

    RescueModel.findById(id)
      .then(addUpdate)
      .catch((err) => {
        log.error(err);
        res.send(err);
      });

    return true;
  },
};
