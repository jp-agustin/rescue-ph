const axios = require('axios');
const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'graph-api-service' });

module.exports = class GraphAPi {
  static callSendAPI(requestBody) {
    axios
      .post('https://graph.facebook.com/v9.0/me/messages', requestBody, {
        params: { access_token: process.env.PAGE_ACCESS_TOKEN },
      })
      .then((resp) => {
        log.info('message sent, status: ', resp.status);
      })
      .catch((error) => {
        if (error) {
          log.error('Unable to send message:', error);
        }
      });
  }
};
