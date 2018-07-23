const fetch = require('node-fetch');

class WebhookService {
  constructor({ webhookUrl }) {
    this.webhookUrl = new URL(webhookUrl).toString();
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
