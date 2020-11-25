const fs = require('fs');
const path = require('path');
const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'load-dummy' });

const { Rescue } = require(path.join(__dirname, '../models/'));

const loadDummy = () => {
  const rawData = fs.readFileSync(path.join(__dirname, './dummy/', 'rescues.json'));
  const rescues = JSON.parse(rawData);

  rescues.forEach((rescue) => {
    const newEntry = new Rescue(rescue);

    newEntry
      .save()
      .then(() => {
        log.info('Entry successfully added');
      })
      .catch((err) => {
        log.error(err);
      });
  });
};

module.exports = loadDummy;
