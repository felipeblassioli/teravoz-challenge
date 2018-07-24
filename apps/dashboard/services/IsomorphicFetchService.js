import isomorphicFetch from '../utils/fetch';

class IsomorphicFetchService {
  constructor({ baseUrl }) {
    this.baseUrl = new URL(baseUrl).toString();
    // Remove trailing /
    this.baseUrl = this.baseUrl.substring(0, this.baseUrl.length - 1);
  }

  fetch(suffix, options) {
    return isomorphicFetch(`${this.baseUrl}${suffix}`, options);
  }
}

export default IsomorphicFetchService;
