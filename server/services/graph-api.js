const axios = require('axios');

const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'graph-api-service' });

module.exports = class GraphAPi {
  static callSendAPI(requestBody) {
    axios
      .post('https://graph.facebook.com/v3.2/me/messages', {
        query: { access_token: process.env.PAGE_ACCESS_TOKEN },
        data: { requestBody },
      })
      .catch((error) => {
        if (error) {
          log.error('Unable to send message:', error);
        } else {
          log.info('message sent!');
        }
      });
  }
};
