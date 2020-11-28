const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'receive-service' });

const path = require('path');

const Response = require(path.join(__dirname, './response'));

function isValidUpdateNumber(updateNumber) {
  const regExpUpdateNumer = /^#[0-9]*$/;
  return regExpUpdateNumer.test(updateNumber);
}

module.exports = class Update {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handleUpdate() {
    log.info('this.user- ', this.user);
    let response;
    const message = this.webhookEvent.message.text;

    if (!isValidUpdateNumber(message)) {
      // TODO: Add function for checking if update reference number is in db
      // If update is not in db
      response = Response.genText('The reference number you have entered does not exist.');
    } else {
      response = Response.genText('You have entered an invalid update reference number.');
    }
    return response;
  }
};
