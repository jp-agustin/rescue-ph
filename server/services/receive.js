const axios = require('axios');
const bunyan = require('bunyan');
const has = require('has');
const path = require('path');

const log = bunyan.createLogger({ name: 'receive-service' });

const Response = require(path.join(__dirname, './response'));
const GraphAPi = require(path.join(__dirname, './graph-api'));
const Rescue = require(path.join(__dirname, './rescue'));
const Update = require(path.join(__dirname, './update'));

module.exports = class Receive {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handleMessage() {
    const event = this.webhookEvent;

    let responses = [];

    try {
      if (event.message) {
        const { message } = event;

        if (message.text) {
          responses = this.handleTextMessage();
        } else if (message.attachments) {
          responses = this.handleAttachmentMessages();
        } else if (message.quick_reply) {
          responses = this.handleQuickReply();
        }
      } else if (event.postback) {
        responses = this.handlePostback();
      }
    } catch (error) {
      log.error(error);
      responses = {
        text: `An error has occured: '${error}'. We have been notified and \
        will fix the issue shortly!`,
      };
    }

    if (Array.isArray(responses)) {
      let delay = 0;
      responses.forEach((response) => {
        this.sendMessage(response, delay * 2000);
        delay += 1;
      });
    } else {
      this.sendMessage(responses);
    }
  }

  handleTextMessage() {
    log.info('Received text:', `${this.webhookEvent.message.text} for ${this.user}`);
    const message = this.webhookEvent.message.text.toLowerCase();

    let response = Response.genStandardErrorMessage();

    if (message.includes('start over')) {
      response = Response.genStartMessage();
    } else if (message.includes('#')) {
      const update = new Update(this.user, this.webhookEvent);
      response = update.handleUpdate();
    } else if (this.user.step) {
      const rescue = new Rescue(this.user, this.webhookEvent);
      response = rescue.handleStep();
    }

    return response;
  }

  handleAttachmentMessages() {
    let response = Response.genStandardErrorMessage();

    // Get the attachment
    const attachment = this.webhookEvent.message.attachments[0];
    log.info('Received attachment:', attachment);

    const rescue = new Rescue(this.user, this.webhookEvent);
    response = rescue.handleAttachment(attachment);

    return response;
  }

  handleQuickReply() {
    const { payload } = this.webhookEvent.message.quick_reply;

    return this.handlePayload(payload);
  }

  handlePostback() {
    const { payload } = this.webhookEvent.postback;
    return this.handlePayload(payload.toUpperCase());
  }

  handlePayload(payload) {
    log.info('Received Payload:', `${payload} for ${this.user.psid}`);

    // TODO: Logging of CTA events

    let response = Response.genStandardErrorMessage();

    switch (payload) {
      case 'GET_STARTED':
        response = Response.genStartMessage();
        break;

      case 'START_OVER':
        this.user.data = {};
        this.user.step = 'CONTACT_NAME_STEP';
        response = Response.genText('Starting over. Please enter your name.');
        break;

      case 'NEED_RESCUE':
        this.user.data = {};
        this.user.step = 'CONTACT_NAME_STEP';
        response = Response.genText('Please enter your name.');
        break;

      case 'TALK_TO_SUPPORT':
        // TODO: Make support service.
        response = Response.genText('Please wait, an agent will connect with you soon.');
        break;

      case 'CONFIRM_INFORMATION':
        // TODO: Make function in rescue service that returns the update number.
        response = Response.genText(
          'Please wait while we process your information. You will receive a reply with your update reference number after.',
        );
        this.addRescue();

        break;

      default:
        response = Response.genStartMessage();
    }

    return response;
  }

  sendMessage(response, delay = 0) {
    // Check if there is delay in the response
    let responseDelay = delay;
    if (has(response, delay)) {
      responseDelay = response.delay;
      delete response.delay;
    }

    // Construct the message body
    const requestBody = {
      recipient: {
        id: this.user.psid,
      },
      message: response,
    };
    log.info('Calling sendmessage', requestBody);

    setTimeout(() => GraphAPi.callSendAPI(requestBody), responseDelay);
  }

  addRescue() {
    const { data } = this.user;
    log.info(this.user);
    axios
      .post('/api/rescues', data)
      .then((response) => log.info(response))
      .catch((err) => log.error(err));
  }
};
