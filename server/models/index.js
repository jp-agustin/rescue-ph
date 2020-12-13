const path = require('path');

const RescueModel = require(path.join(__dirname, './Rescue'));
const UpdateModel = require(path.join(__dirname, './Update'));

module.exports = {
  RescueModel,
  UpdateModel,
};
