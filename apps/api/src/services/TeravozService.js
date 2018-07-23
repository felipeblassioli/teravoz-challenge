const nodeFetch = require('node-fetch');

class TeravozService {
  constructor({ baseUrl, deps: { fetch = nodeFetch } = {} }) {
    baseUrl = new URL(baseUrl);
    this.delegateUrl = new URL('/actions', baseUrl).toString();
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
