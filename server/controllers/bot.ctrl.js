const bunyan = require('bunyan');
// const path = require('path');

// const Receive = require(path.join(__dirname, '../services/receive'));

const log = bunyan.createLogger({ name: 'messengerBot' });

const users = {};

module.exports = {
  // Get Webhook
  getWebhook: (req, res) => {
    const { VERIFY_TOKEN } = process.env;

    // Parse params from the webhook verification request
    // TODO: Try if destructuring would work
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Respond with 200 OK and challenge token from the request
        log.info('WEBHOOK_VERIFIED');
        res.send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  },
  // Post Webhook
  postWebhook: (req, res) => {
    // Parse the request body from the POST
    const { object, entry } = req.body;

    // Check the webhook event is from a Page subscription
    if (object === 'page') {
      // Iterate over each entry - there may be multiple if batched
      entry.forEach((e) => {
        // Get the webhook event. entry.messaging is an array, but
        // will only ever contain one event, so we get index 0
        const webhookEvent = e.messaging[0];
        log.info(webhookEvent);

        // Discard uninteresting events
        if ('read' in webhookEvent) {
          return;
        }

        if ('delivery' in webhookEvent) {
          return;
        }

        // Get the sender PSID
        const senderPsid = webhookEvent.sender.id;
        log.info(`Sender ID: ${senderPsid}`);

        // TODO: Improve this by adding a user service that fetches publicly available user info.
        if (!(senderPsid in users)) {
          users[senderPsid] = {
            step: 'START',
            psid: senderPsid,
          };
        }

        // let receiveMessage = new Receive(users[senderPsid], webhookEvent);
        // return receiveMessage.handleMessage();
      });

      // Return a '200 OK' response to all events
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  },
};
