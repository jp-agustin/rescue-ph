const path = require('path');

const rescue = require(path.join(__dirname, './rescue'));

module.exports = (router) => {
  rescue(router);
};
