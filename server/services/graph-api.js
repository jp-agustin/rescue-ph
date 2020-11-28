const request = require('request');

const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'graph-api-service' });

module.exports = class GraphAPi {
  static callSendAPI(requestBody) {
    request(
      {
        uri: 'https://graph.facebook.com/v3.2/me/messages',
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: requestBody,
      },
      (error) => {
        if (error) {
          log.error('Unable to send message:', error);
        } else {
          log.info('message sent!');
        }
      },
    );
  }
};
