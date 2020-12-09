const axios = require('axios');
const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'graph-api-service' });

module.exports = class GraphAPi {
  static callSendAPI(requestBody) {
    const messengerUrl = `https://graph.facebook.com/v3.2/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`;
    axios.post(messengerUrl, { requestBody }).catch((error) => {
      if (error) {
        log.error('Unable to send message:', error);
      } else {
        log.info('message sent!');
      }
    });
  }
};
