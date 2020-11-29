const path = require('path');

const bot = require(path.join(__dirname, './bot'));
const rescue = require(path.join(__dirname, './rescue'));

module.exports = (router, io) => {
  bot(router);
  rescue(router, io);
};
