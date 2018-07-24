import IsomorphicFetchService from './IsomorphicFetchService';

class ApiService extends IsomorphicFetchService {
  async getActiveCalls() {
    const response = await this.fetch('/calls/active');
    return Object.values(response.data);
  }
}

export default ApiService;
