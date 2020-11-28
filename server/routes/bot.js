const path = require('path');

const botCtrl = require(path.join(__dirname, '../controllers/bot.ctrl'));

module.exports = (router) => {
  // GET
  // Get messenger bot webhook
  router.route('/webhook').get(botCtrl.getWebhook);
  // POST
  // Post messenger bot Webhook
  router.route('/webhook').post(botCtrl.postWebhook);
};
