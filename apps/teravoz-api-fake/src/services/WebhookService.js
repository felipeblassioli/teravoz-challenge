const fetch = require('node-fetch');
const isUrl = require('is-url');

class WebhookService {
  constructor({ webhookUrl }) {
    if (!isUrl(webhookUrl)) {
      throw new TypeError(
        `InvalidParameter: webhookUrl=${webhookUrl} must be a valid url`
      );
    }
    webhookUrl = webhookUrl.endsWith('/')
      ? webhookUrl.substring(0, webhookUrl.length - 1)
      : webhookUrl;

    this.webhookUrl = webhookUrl;
  }

  async notifyWebhook(body) {
    console.log(`POST ${this.webhookUrl}`);
    console.log(body);

    try {
      return await fetch(this.webhookUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log(`Webhook notification failed for url=${this.webhookUrl}`);
    }
  }
}

module.exports = WebhookService;
