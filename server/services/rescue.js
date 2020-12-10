const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'receive-service' });
const path = require('path');

const Response = require(path.join(__dirname, './response'));

const isValidContactNumber = (contactNumber) => {
  const regExpContactNumber = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  return regExpContactNumber.test(contactNumber);
};

const isValidName = (name) => {
  const regExpName = /^[A-Za-z\s]+$/;
  return regExpName.test(name);
};

module.exports = class Rescue {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handleStep() {
    log.info('this.user- ', this.user);
    let response = Response.genStandardErrorMessage();
    const message = this.webhookEvent.message.text;
    const { step } = this.user;
    let locationInfo = '';

    switch (step) {
      case 'START':
        response = Response.genStartMessage();
        break;

      case 'CONTACT_NAME_STEP':
        if (isValidName(message) && message.length > 2) {
          this.user.data = { contactPerson: message };
          this.user.step = 'CONTACT_NUMBER_STEP';
          response = Response.genText(
            'Okay, please enter a contact number. \nSample format: (0917123123)',
          );
        } else {
          response = Response.genText('Please enter a valid name.');
        }
        break;

      case 'CONTACT_NUMBER_STEP':
        if (isValidContactNumber(message)) {
          this.user.data.contactNumber = message;
          this.user.step = 'LOCATION_STEP';
          response = Response.genText(
            'Okay, please enter the full address or send a location pin.',
          );
        } else {
          response = Response.genText('Please enter a valid contact number.');
        }
        break;

      case 'LOCATION_STEP':
        this.user.data.location = { address: message };
        this.user.step = 'NUMBER_OF_PERSONS_STEP';
        response = Response.genText('Okay. please enter the number of persons who need rescuing');
        break;

      case 'NUMBER_OF_PERSONS_STEP':
        if (!Number.isNaN(parseInt(message, 10))) {
          this.user.data.noOfPerson = message;
          this.user.step = 'ADDITIONAL_INFO_STEP';
          response = Response.genText('Okay. please enter any additional information.');
        } else {
          response = Response.genText('Please enter a number.');
        }
        break;

      case 'ADDITIONAL_INFO_STEP':
        this.user.data.additionalInfo = message;
        this.user.step = 'CONFIRMATION_STEP';

        locationInfo = this.user.data.location.address
          ? this.user.data.location.address
          : `Lat: ${this.user.data.location.lat}, Long: ${this.user.data.location.long}`;

        response = Response.genButtonTemplate(
          `
            Please confirm that the following information is correct.
            \nContact Person: ${this.user.data.contactPerson}
            \nContact Number: ${this.user.data.contactNumber}
            \nLocation: ${locationInfo}
            \nNumber of Persons: ${this.user.data.noOfPerson}
            \nAdditional Information: ${this.user.data.additionalInfo}
          `,
          [
            Response.genPostbackButton('Yes, that is correct', 'CONFIRM_INFORMATION'),
            Response.genPostbackButton('Start over', 'START_OVER'),
          ],
        );
        break;

      case 'CONFIRMATION_STEP':
        locationInfo = this.user.data.location.address
          ? this.user.data.location.address
          : `Lat: ${this.user.data.location.lat}, Long: ${this.user.data.location.long}`;

        response = Response.genButtonTemplate(
          `
            Please confirm that the following information is correct.
            \nContact Person: ${this.user.data.contactPerson}
            \nContact Number: ${this.user.data.contactNumber}
            \nLocation: ${locationInfo}
            \nNumber of Persons: ${this.user.data.noOfPerson}
            \nAdditional Information: ${this.user.data.additionalInfo}
          `,
          [
            Response.genPostbackButton('Yes, that is correct', 'CONFIRM_INFORMATION'),
            Response.genPostbackButton('Start over', 'START_OVER'),
          ],
        );
        break;

      default:
        response = Response.genStartMessage();
    }
    return response;
  }

  handleAttachment(attachment) {
    let response = '';

    if (this.user.step === 'LOCATION_STEP' && attachment.payload.coordinates) {
      this.user.data.location = {
        lat: attachment.payload.coordinates.lat,
        long: attachment.payload.coordinates.long,
      };
      response = Response.genText(
        'Received location from pinned location. Please enter the number of persons who need rescue.',
      );
      this.user.step = 'NUMBER_OF_PERSONS_STEP';
    } else {
      response = Response.genText('Sorry, please refer to the previous step.');
    }
    return response;
  }

  static setToPreviousStep() {
    // TO-DO: Make logic for setting to previous step.
  }
};
