module.exports = class Response {
  static genButtonTemplate(title, buttons) {
    const response = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: title,
          buttons,
        },
      },
    };

    return response;
  }

  static genPostbackButton(title, payload) {
    const response = {
      type: 'postback',
      title,
      payload,
    };

    return response;
  }

  static genText(text) {
    const response = {
      text,
    };

    return response;
  }

  static genQuickReply(text, quickReplies) {
    const response = {
      text,
      quick_replies: [],
    };

    quickReplies.forEach((quickReply) => {
      response.quick_replies.push({
        content_type: 'text',
        title: quickReply.title,
        payload: quickReply.payload,
      });
    });
  }

  static genStartMessage() {
    const response = this.genButtonTemplate(
      'Hi, this is an automated experience. Please select an option to proceed.',
      [
        this.genPostbackButton('I need rescue!', 'NEED_RESCUE'),
        this.genPostbackButton('Talk to support', 'TALK_TO_SUPPORT'),
      ],
    );
    return response;
  }

  static genStandardErrorMessage() {
    const response = this.genText(
      'Something went wrong, we have been notified and will be back with you shortly',
    );

    return response;
  }
};
