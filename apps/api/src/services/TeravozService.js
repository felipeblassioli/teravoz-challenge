const nodeFetch = require('node-fetch');
const isUrl = require('is-url');

class TeravozService {
  constructor({ baseUrl, deps: { fetch = nodeFetch } = {} }) {
    if (!isUrl(baseUrl)) {
      throw new TypeError(
        `InvalidParameter: baseUrl=${baseUrl} must be a valid url`
      );
    }
    baseUrl = baseUrl.endsWith('/')
      ? baseUrl.substring(0, baseUrl.length - 1)
      : baseUrl;

    this.delegateUrl = `${baseUrl}/actions`;
    this.fetch = fetch;
  }

  delegate(payload) {
    return this.fetch(this.delegateUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

module.exports = TeravozService;
