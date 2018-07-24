import isomorphicFetch from '../utils/fetch';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { host, port } = serverRuntimeConfig;

class IsomorphicFetchService {
  constructor({ baseUrl }) {
    // In a server side context we cannot use a relative url
    if (!process.browser && baseUrl.startsWith('/')) {
      baseUrl = `http://${host}:${port}${baseUrl}`;
      baseUrl = new URL(baseUrl).toString();
    }

    // Remove trailing /
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    this.baseUrl = baseUrl;
  }

  fetch(suffix, options) {
    return isomorphicFetch(`${this.baseUrl}${suffix}`, options);
  }
}

export default IsomorphicFetchService;
