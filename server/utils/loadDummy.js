const fs = require('fs');
const path = require('path');
const bunyan = require('bunyan');

const isEmpty = require(path.join(__dirname, './isEmpty'));

const log = bunyan.createLogger({ name: 'load-dummy' });

const { Rescue, Update } = require(path.join(__dirname, '../models/'));

const addUpdates = (updates, rescue, ind) => {
  const breakpoints = [[0, 1], [], [2, 3], [4, 4], [5, 6], [7, 7], [], [8, 8], [9, 9], [10, 12]];

  if (!isEmpty(breakpoints[ind])) {
    for (let i = breakpoints[ind][0]; i <= breakpoints[ind][1]; i += 1) {
      const newUpdateEntry = new Update({
        rescueId: rescue,
        timestamp: new Date(updates[i].timestamp),
        update: updates[i].update,
      });

      newUpdateEntry
        .save()
        .then(() => log.info('Update successfully added'))
        .catch((err) => {
          log.error(err);
        });
    }
  }

  log.info('Rescue successfully added');
};

const loadDummy = () => {
  const rawRescuesData = fs.readFileSync(path.join(__dirname, './dummy/', 'rescues.json'));
  const rawUpdatesData = fs.readFileSync(path.join(__dirname, './dummy/', 'updates.json'));
  const rescues = JSON.parse(rawRescuesData);
  const updates = JSON.parse(rawUpdatesData);

  rescues.forEach((rescue, ind) => {
    const newRescueEntry = new Rescue(rescue);

    newRescueEntry
      .save()
      .then((savedRescue) => {
        addUpdates(updates, savedRescue, ind);
      })
      .catch((err) => {
        log.error(err);
      });
  });
};

module.exports = loadDummy;
