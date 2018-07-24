import IsomorphicFetchService from './IsomorphicFetchService';

class TeravozService extends IsomorphicFetchService {
  async getSimulationStatus() {
    const response = await this.fetch('/simulation/status');
    return response.data.status;
  }
}

export default TeravozService;
